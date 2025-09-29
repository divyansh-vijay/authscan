import { PrismaClient } from '@prisma/client';
import { Client as MinioClient } from 'minio';
import crypto from 'crypto';
import * as XLSX from 'xlsx';
import sharp from 'sharp';

const prisma = new PrismaClient();

// Minio configuration
const minioClient = new MinioClient({
    endPoint: process.env.MINIO_ENDPOINT,
    port: parseInt(process.env.MINIO_PORT) || 9000,
    useSSL: process.env.MINIO_USE_SSL === 'true',
    accessKey: process.env.MINIO_ACCESS_KEY,
    secretKey: process.env.MINIO_SECRET_KEY,
});

const BUCKET_NAME = 'certificates';

// --- SERVICE CLASSES ---

/**
 * Handles all dashboard-related data fetching.
 */
export class DashboardService {
    static async getStats(instituteId) {
        const now = new Date();
        const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const currentMonth = new Date(now.getFullYear(), now.getMonth(), 1);

        const totalIssued = await prisma.certificate.count({
            where: { instituteId, status: 'ISSUED' }
        });

        const totalVerifications = await prisma.verification.count({
            where: {
                certificate: { instituteId }
            }
        });

        const activeStudents = await prisma.certificate.groupBy({
            by: ['studentEmail'],
            where: {
                instituteId,
                status: 'ISSUED',
                issueDate: { gte: new Date(now.getFullYear(), now.getMonth() - 6, 1) }
            }
        });

        const successfulVerifications = await prisma.verification.count({
            where: {
                certificate: { instituteId },
                result: 'VERIFIED'
            }
        });
        const successRate = totalVerifications > 0
            ? (successfulVerifications / totalVerifications) * 100
            : 0;

        const lastMonthIssued = await prisma.certificate.count({
            where: {
                instituteId,
                status: 'ISSUED',
                createdAt: { gte: lastMonth, lt: currentMonth }
            }
        });

        const currentMonthIssued = await prisma.certificate.count({
            where: {
                instituteId,
                status: 'ISSUED',
                createdAt: { gte: currentMonth }
            }
        });

        const lastMonthVerifications = await prisma.verification.count({
            where: {
                certificate: { instituteId },
                createdAt: { gte: lastMonth, lt: currentMonth }
            }
        });

        const currentMonthVerifications = await prisma.verification.count({
            where: {
                certificate: { instituteId },
                createdAt: { gte: currentMonth }
            }
        });

        const issuedGrowth = lastMonthIssued > 0
            ? ((currentMonthIssued - lastMonthIssued) / lastMonthIssued) * 100
            : 0;

        const verificationsGrowth = lastMonthVerifications > 0
            ? ((currentMonthVerifications - lastMonthVerifications) / lastMonthVerifications) * 100
            : 0;

        return {
            totalIssued,
            totalVerifications,
            activeStudents: activeStudents.length,
            successRate: Math.round(successRate * 10) / 10,
            monthlyGrowth: {
                issued: Math.round(issuedGrowth * 10) / 10,
                verifications: Math.round(verificationsGrowth * 10) / 10
            }
        };
    }

    static async getRecentCertificates(instituteId, limit = 10) {
        return await prisma.certificate.findMany({
            where: { instituteId },
            orderBy: { createdAt: 'desc' },
            take: limit,
            select: {
                id: true,
                certificateId: true,
                studentName: true,
                program: true,
                issueDate: true,
                status: true,
                blockchainTx: true
            }
        });
    }

    static async getVerificationLogs(instituteId, limit = 10) {
        return await prisma.verification.findMany({
            where: {
                certificate: { instituteId }
            },
            include: {
                certificate: {
                    select: {
                        certificateId: true
                    }
                }
            },
            orderBy: { createdAt: 'desc' },
            take: limit
        });
    }
}

/**
 * Handles certificate creation and management.
 */
export class CertificateService {
    static generateCertificateId(instituteCode) {
        const year = new Date().getFullYear();
        const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        return `${instituteCode}-${year}-${randomNum}`;
    }

    static generateCertificateHash(certificateData) {
        const dataString = JSON.stringify(certificateData) + Date.now();
        return crypto.createHash('sha256').update(dataString).digest('hex');
    }

    static async issueSingleCertificate(instituteId, issuedById, certificateData) {
        const institute = await prisma.institute.findUnique({
            where: { id: instituteId }
        });
        if (!institute) {
            throw new Error('Institute not found');
        }

        const certificateId = this.generateCertificateId(institute.instituteCode);
        const certificateHash = this.generateCertificateHash(certificateData);

        let student = await prisma.user.findUnique({
            where: { email: certificateData.studentEmail }
        });
        if (!student) {
            student = await prisma.user.create({
                data: {
                    firstName: certificateData.studentName.split(' ')[0],
                    lastName: certificateData.studentName.split(' ').slice(1).join(' '),
                    email: certificateData.studentEmail,
                    password: crypto.randomBytes(32).toString('hex'),
                    role: 'USER'
                }
            });
        }

        const certificate = await prisma.certificate.create({
            data: {
                certificateId,
                studentName: certificateData.studentName,
                studentEmail: certificateData.studentEmail,
                program: certificateData.program,
                programCode: certificateData.programCode,
                issueDate: new Date(certificateData.issueDate),
                grade: certificateData.grade,
                duration: certificateData.duration,
                description: certificateData.description,
                certificateHash,
                status: 'ISSUED',
                instituteId,
                issuedById,
                studentId: student.id
            }
        });

        return certificate;
    }
}

/**
 * Handles batch processing of certificate files.
 */
export class BatchUploadService {
    static async #uploadFile(file, fileName, instituteId) {
        const objectName = `${instituteId}/${Date.now()}-${fileName}`;
        await minioClient.putObject(BUCKET_NAME, objectName, file);
        return await minioClient.presignedGetObject(BUCKET_NAME, objectName, 24 * 60 * 60);
    }

    static async #extractFromExcel(file) {
        const workbook = XLSX.read(file, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(worksheet);

        return data.map((row) => ({
            studentName: row.studentName || row.student_name || row['Student Name'],
            studentEmail: row.studentEmail || row.student_email || row['Student Email'],
            program: row.program || row.Program,
            programCode: row.programCode || row.program_code || row['Program Code'],
            issueDate: row.issueDate || row.issue_date || row['Issue Date'],
            grade: row.grade || row.Grade,
            duration: row.duration || row.Duration,
            description: row.description || row.Description
        }));
    }

    static async #extractFromPDF(file) {
        // const pdfData = await pdf(file);
        // const text = pdfData.text;
        // const lines = text.split('\n');
        // const certificates = [];
        // let currentCert = {};

        // for (const line of lines) {
        //     if (line.includes('Student Name:')) {
        //         currentCert.studentName = line.split('Student Name:')[1]?.trim();
        //     } else if (line.includes('Email:')) {
        //         currentCert.studentEmail = line.split('Email:')[1]?.trim();
        //     } else if (line.includes('Program:')) {
        //         currentCert.program = line.split('Program:')[1]?.trim();
        //     } else if (line.includes('Issue Date:')) {
        //         currentCert.issueDate = line.split('Issue Date:')[1]?.trim();
        //         if (currentCert.studentName && currentCert.studentEmail && currentCert.program) {
        //             certificates.push(currentCert);
        //             currentCert = {};
        //         }
        //     }
        // }
        // return certificates;
    }

    static async #extractFromImage(file) {
        // Placeholder for OCR logic
        throw new Error('OCR processing not implemented yet');
    }

    static async #extractDataFromFile(file, mimeType) {
        if (mimeType === 'application/pdf') {
            return await this.#extractFromPDF(file);
        } else if (mimeType.startsWith('image/')) {
            return await this.#extractFromImage(file);
        } else if (
            mimeType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
            mimeType === 'application/vnd.ms-excel'
        ) {
            return await this.#extractFromExcel(file);
        } else {
            throw new Error(`Unsupported file type: ${mimeType}`);
        }
    }

    static async processBatchUpload(instituteId, issuedById, file, fileName, mimeType) {
        const batchUpload = await prisma.batchUpload.create({
            data: {
                fileName,
                totalCount: 0,
                uploadedById: issuedById,
                instituteId,
                status: 'PROCESSING'
            }
        });

        await this.#uploadFile(file, fileName, instituteId);
        const certificatesData = await this.#extractDataFromFile(file, mimeType);

        await prisma.batchUpload.update({
            where: { id: batchUpload.id },
            data: { totalCount: certificatesData.length }
        });

        let successCount = 0;
        let failedCount = 0;

        for (const [i, certData] of certificatesData.entries()) {
            try {
                await CertificateService.issueSingleCertificate(instituteId, issuedById, certData);
                successCount++;
            } catch (error) {
                failedCount++;
                await prisma.batchUploadError.create({
                    data: {
                        batchUploadId: batchUpload.id,
                        rowNumber: i + 1,
                        errorMessage: error.message,
                        rowData: certData
                    }
                });
            }
        }

        const status = failedCount === 0 ? 'COMPLETED' : successCount === 0 ? 'FAILED' : 'PARTIAL';

        await prisma.batchUpload.update({
            where: { id: batchUpload.id },
            data: { successCount, failedCount, status }
        });

        return {
            batchUploadId: batchUpload.id,
            totalCount: certificatesData.length,
            successCount,
            failedCount,
            status
        };
    }
}

/**
 * Handles analytics and reporting.
 */
export class AnalyticsService {
    static #formatMonthlyData(data) {
        const monthlyData = {};
        data.forEach(item => {
            const date = new Date(item.issueDate || item.createdAt);
            const monthKey = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
            monthlyData[monthKey] = (monthlyData[monthKey] || 0) + (item._count || 1);
        });
        return Object.entries(monthlyData).map(([month, count]) => ({ month, count }));
    }

    static async getAnalyticsData(instituteId) {
        const oneYearAgo = new Date(new Date().setFullYear(new Date().getFullYear() - 1));

        const issuanceByMonth = await prisma.certificate.groupBy({
            by: ['issueDate'],
            where: { instituteId, status: 'ISSUED', issueDate: { gte: oneYearAgo } },
            _count: true
        });

        const verificationsByMonth = await prisma.verification.groupBy({
            by: ['createdAt'],
            where: { certificate: { instituteId }, createdAt: { gte: oneYearAgo } },
            _count: true
        });

        const programStatsRaw = await prisma.certificate.groupBy({
            by: ['program'],
            where: { instituteId, status: 'ISSUED' },
            _count: true
        });

        const programStats = await Promise.all(
            programStatsRaw.map(async (stat) => {
                const verifications = await prisma.verification.count({
                    where: { certificate: { instituteId, program: stat.program } }
                });
                const successfulVerifications = await prisma.verification.count({
                    where: { certificate: { instituteId, program: stat.program }, result: 'VERIFIED' }
                });
                return {
                    program: stat.program,
                    issued: stat._count,
                    verifications,
                    successRate: verifications > 0 ? (successfulVerifications / verifications) * 100 : 0
                };
            })
        );

        return {
            issuanceByMonth: this.#formatMonthlyData(issuanceByMonth),
            verificationsByMonth: this.#formatMonthlyData(verificationsByMonth),
            programStats
        };
    }
}

/**
 * Handles API key generation and validation.
 */
export class ApiKeyService {
    static async generateApiKey(instituteId, name) {
        const apiKey = crypto.randomBytes(32).toString('hex');
        const keyHash = crypto.createHash('sha256').update(apiKey).digest('hex');

        await prisma.apiKey.create({
            data: { name, keyHash, instituteId }
        });

        return apiKey;
    }

    static async validateApiKey(apiKey) {
        const keyHash = crypto.createHash('sha256').update(apiKey).digest('hex');
        const apiKeyRecord = await prisma.apiKey.findUnique({
            where: { keyHash },
            include: { institute: true }
        });

        if (!apiKeyRecord || !apiKeyRecord.isActive) {
            return null;
        }

        await prisma.apiKey.update({
            where: { id: apiKeyRecord.id },
            data: {
                lastUsed: new Date(),
                usageCount: { increment: 1 }
            }
        });

        return apiKeyRecord.instituteId;
    }
}

