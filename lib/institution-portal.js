import { PrismaClient } from '@prisma/client';
import { Client as MinioClient } from 'minio';
import crypto from 'crypto';
import * as XLSX from 'xlsx';
// No longer needed: import FormData from 'form-data';

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
const OCR_API_URL = process.env.OCR_API_URL || 'http://127.0.0.1:5000/api/ocr';
const BLOCKCHAIN_API_URL = process.env.BLOCKCHAIN_API_URL || 'http://127.0.0.1:4000';


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
        const certificate = await prisma.certificate.findMany({
            where: { instituteId },
            orderBy: { createdAt: 'desc' },
            take: limit,
            select: {
                id: true,
                certificateId: true,
                studentName: true,
                issueDate: true,
                status: true,
                blockchainTx: true
            }
        });
        return certificate;
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
        const dataString = JSON.stringify(certificateData);
        return crypto.createHash('sha256').update(dataString).digest('hex');
    }

    static async uploadToBlockchain(certificateHash) {
        const res = await fetch(`${BLOCKCHAIN_API_URL}/api/issue-certificate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ certificateHash })
        })
        const data = await res.json()
        console.log(data)
        return data
    }

    static async issueSingleCertificate(instituteId, issuedById, certificateData) {

        //    lowercase all values in certificateData
        for (const key in certificateData) {
            if (typeof certificateData[key] === 'string') {
                certificateData[key] = certificateData[key].toLowerCase();
            }
        }

        const institute = await prisma.institute.findUnique({
            where: { id: instituteId }
        });
        if (!institute) {
            throw new Error('Institute not found');
        }
        console.log(certificateData.issueDate)

        const certificateId = this.generateCertificateId(institute.instituteCode);
        const certificateHash = this.generateCertificateHash(certificateData);
        const blockchainTx = await this.uploadToBlockchain(certificateHash);

        if (!blockchainTx.success) {
            throw new Error(blockchainTx.error || 'Failed to issue certificate');
        }

        if (certificateData.studentEmail) {
            let student = await prisma.user.findUnique({
                where: { email: certificateData.studentEmail }
            });
            if (!student) {
                student = await prisma.user.create({
                    data: {
                        firstName: certificateData.studentName.split(' ')[0],
                        lastName: certificateData.studentName.split(' ').slice(1).join(' ') || 'N/A',
                        email: certificateData.studentEmail,
                        password: crypto.randomBytes(32).toString('hex'),
                        role: 'USER'
                    }
                });
            }
        }

        let splittedIssueDate = certificateData.issueDate.split("-")
        if (splittedIssueDate[0].length == 4) {
            certificateData.issueDate = new Date(`${splittedIssueDate[1]}/${splittedIssueDate[2]}/${splittedIssueDate[0]}`)
        } else {
            certificateData.issueDate = new Date(`${splittedIssueDate[1]}/${splittedIssueDate[0]}/${splittedIssueDate[2]}`)
        }

        // FIX: Restored the original data structure, including the required fields.
        const certificate = await prisma.certificate.create({
            data: {
                certificateId,
                studentName: certificateData.studentName,
                transactionHash: blockchainTx.transactionHash,
                blockNumber: blockchainTx.blockNumber,
                uploadedOnchain: true,
                studentEmail: certificateData.studentEmail,
                courseName: certificateData.courseName,
                organization: institute.organization,
                issueDate: new Date(certificateData.issueDate),
                grade: certificateData.grade,
                duration: certificateData.duration,
                description: certificateData.description,
                certificateHash,
                status: 'ISSUED',
                instituteId,
                issuedById,

            }
        });

        return certificate;
    }
}

/**
 * Handles batch processing of certificate files.
 */
export class BatchUploadService {
    static async #uploadFileToMinio(file, fileName, instituteId) {
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

    /**
     * Sends a file to the Python OCR service for data extraction.
     * @param {Buffer} fileBuffer The file content as a buffer.
     * @param {string} originalName The original name of the file.
     * @param {string} mimeType The MIME type of the file.
     * @returns {Promise<object>} The extracted data from the OCR service.
     */
    static async #callOcrService(fileBuffer, originalName, mimeType) {



        const form = new FormData();

        // FIX: Use the 'File' constructor to create a file-like object,
        // which is a more accurate representation of a browser upload.
        const imageFile = new File([fileBuffer], originalName, { type: mimeType });

        // The Python service expects the file under the key 'image'
        form.append('image', imageFile);

        try {
            const response = await fetch(OCR_API_URL, {
                method: 'POST',
                body: form,
            });

            if (!response.ok) {
                const errorBody = await response.json();
                throw new Error(`OCR service failed with status ${response.status}: ${errorBody.error || 'Unknown error'}`);
            }

            const result = await response.json();
            if (!result.success) {
                throw new Error(`OCR service returned an error: ${result.error || 'Failed to process file'}`);
            }
            return result.data;
        } catch (error) {
            console.error("Error calling OCR service:", error);
            throw new Error("Could not connect to or process file with the OCR service.");
        }
    }


    static async #extractDataFromFile(file, fileName, mimeType) {
        if (mimeType === 'application/pdf' || mimeType.startsWith('image/')) {
            // Pass the mimeType to the OCR service call
            const extractedData = await this.#callOcrService(file, fileName, mimeType);
            return [extractedData];
        } else if (
            mimeType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
            mimeType === 'application/vnd.ms-excel'
        ) {
            return await this.#extractFromExcel(file);
        } else {
            throw new Error(`Unsupported file type: ${mimeType}`);
        }
    }

    /**
     * Processes a batch of uploaded files.
     * @param {string} instituteId The ID of the institute.
     * @param {string} issuedById The ID of the user issuing the certificates.
     * @param {Array<{buffer: Buffer, name: string, type: string}>} files An array of file objects to process.
     * @returns {Promise<object>} A summary of the batch processing result.
     */
    static async processBatchUpload(instituteId, issuedById, files) {
        if (!files || files.length === 0) {
            throw new Error("No files provided for batch upload.");
        }

        const batchUpload = await prisma.batchUpload.create({
            data: {
                fileName: `Batch upload of ${files.length} files`,
                totalCount: files.length,
                uploadedById: issuedById,
                instituteId,
                status: 'PROCESSING'
            }
        });

        let successCount = 0;
        let failedCount = 0;
        let failedFiles = [];


        for (const [i, file] of files.entries()) {
            try {
                // Upload each file to Minio first
                await this.#uploadFileToMinio(file.buffer, file.name, instituteId);

                // Extract data from the file
                const certificatesData = await this.#extractDataFromFile(file.buffer, file.name, file.type);
                console.log({ certificatesData })
                if (!certificatesData || certificatesData.length === 0) {
                    throw new Error("No certificate data could be extracted from this file.");
                }

                // Process all certificates extracted from the current file
                for (const certData of certificatesData) {
                    if (!certData.studentName || !certData.organization || !certData.issueDate || !certData.courseName || !certData.studentName == 'N/A' || !certData.organization == 'N/A' || !certData.issueDate == 'N/A' || !certData.courseName == 'N/A') {
                        throw new Error("Extracted data is missing one or more required fields (studentName, organization, courseName, issueDate).");
                    }
                    await CertificateService.issueSingleCertificate(instituteId, issuedById, certData);
                }
                successCount++; // Count successful files, not individual certificates
            } catch (error) {
                console.log(error)
                failedFiles.push({ name: file.name, error: error.message })
                failedCount++;
                await prisma.batchUploadError.create({
                    data: {
                        batchUploadId: batchUpload.id,
                        rowNumber: i + 1, // This now refers to the file index
                        errorMessage: `File (${file.name}): ${error.message}`,
                        rowData: { originalFile: file.name }
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
            totalCount: files.length,
            successCount,
            failedCount,
            failedFiles,
            status
        };
    }
}

/**
 * Handles analytics and reporting.
 */
// export class AnalyticsService {
//     static #formatMonthlyData(data, dateField) {
//         const monthlyData = {};
//         data.forEach(item => {
//             const date = new Date(item[dateField]);
//             const monthKey = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
//             const count = item._count._all || item._count.id || 0;
//             monthlyData[monthKey] = (monthlyData[monthKey] || 0) + count;
//         });
//         return Object.entries(monthlyData).map(([month, count]) => ({ month, count }));
//     }

//     static async getAnalyticsData(instituteId) {
//         const oneYearAgo = new Date(new Date().setFullYear(new Date().getFullYear() - 1));

//         const issuedCertificates = await prisma.certificate.findMany({
//             where: {
//                 instituteId,
//                 status: 'ISSUED',
//                 issueDate: { gte: oneYearAgo }
//             },
//             select: {
//                 issueDate: true
//             }
//         });
//         console.log({ issuanceByMonth })
//         const verificationsByMonth = await prisma.verification.groupBy({
//             by: ['createdAt'],
//             where: { certificate: { instituteId }, createdAt: { gte: oneYearAgo } },
//             _count: { _all: true }
//         });

//         const programStatsRaw = await prisma.certificate.groupBy({
//             by: ['courseName'],
//             where: { instituteId, status: 'ISSUED' },
//             _count: { id: true }
//         });

//         const programStats = await Promise.all(
//             programStatsRaw.map(async (stat) => {
//                 const verifications = await prisma.verification.count({
//                     where: { certificate: { instituteId, courseName: stat.courseName } }
//                 });
//                 const successfulVerifications = await prisma.verification.count({
//                     where: { certificate: { instituteId, courseName: stat.courseName }, result: 'VERIFIED' }
//                 });


//                 return {
//                     courseName: stat.courseName,
//                     issued: stat._count.id,
//                     verifications,
//                     successRate: verifications > 0 ? (successfulVerifications / verifications) * 100 : 0
//                 };
//             })
//         );

//         return {
//             issuanceByMonth: this.#formatMonthlyData(issuanceByMonth, 'issueDate'),
//             verificationsByMonth: this.#formatMonthlyData(verificationsByMonth, 'createdAt'),
//             programStats
//         };
//     }
// }
export class AnalyticsService {
    static #formatMonthlyData(records, dateField) {
        const monthlyData = {};
        records.forEach(item => {
            const date = new Date(item[dateField]);
            console.log({ date: item[dateField] })
            const monthKey = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
            monthlyData[monthKey] = (monthlyData[monthKey] || 0) + 1; // Increment by 1 for each record
        });
        return Object.entries(monthlyData).map(([month, count]) => ({ month, count }));
    }

    static async getAnalyticsData(instituteId) {
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

        const issuedCertificates = await prisma.certificate.findMany({
            where: {
                instituteId,
                status: 'ISSUED',
                createdAt: { gte: oneYearAgo }
            },
            select: {
                issueDate: true,
                createdAt: true
            }
        });


        const verifications = await prisma.verification.findMany({
            where: {
                certificate: { instituteId },
                createdAt: { gte: oneYearAgo }
            },
            select: {
                createdAt: true
            }
        });

        const programStatsRaw = await prisma.certificate.groupBy({
            by: ['courseName'],
            where: { instituteId, status: 'ISSUED' },
            _count: { id: true }
        });

        const programStats = await Promise.all(
            programStatsRaw.map(async (stat) => {
                // FIX: Rewrote the query to avoid the Prisma validation error.
                // First, find all certificate IDs for this program and institute.
                const certificates = await prisma.certificate.findMany({
                    where: {
                        instituteId,
                        courseName: stat.courseName,
                    },
                    select: {
                        id: true,
                    },
                });
                const certificateIds = certificates.map(c => c.id);

                // Now, count verifications based on those specific certificate IDs.
                const verificationsCount = await prisma.verification.count({
                    where: { certificateId: { in: certificateIds } }
                });
                const successfulVerifications = await prisma.verification.count({
                    where: {
                        certificateId: { in: certificateIds },
                        result: 'VERIFIED'
                    }
                });

                return {
                    courseName: stat.courseName,
                    issued: stat._count.id,
                    verifications: verificationsCount,
                    successRate: verificationsCount > 0 ? (successfulVerifications / verificationsCount) * 100 : 0
                };
            })
        );

        return {
            issuanceByMonth: this.#formatMonthlyData(issuedCertificates, 'createdAt'),
            verificationsByMonth: this.#formatMonthlyData(verifications, 'createdAt'),
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

