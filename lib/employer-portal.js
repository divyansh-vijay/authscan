import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';

const prisma = new PrismaClient();
const BLOCKCHAIN_API_URL = process.env.BLOCKCHAIN_API_URL || 'http://127.0.0.1:4000';

/**
 * Handles dashboard data for the employer portal.
 */
export class EmployerDashboardService {
    static async getStats(employerUserId) {
        const totalVerifications = await prisma.verification.count({
            where: { userId: employerUserId }
        });

        const successfulVerifications = await prisma.verification.count({
            where: { userId: employerUserId, result: 'VERIFIED' }
        });

        const failedVerifications = await prisma.verification.count({
            where: { userId: employerUserId, result: 'FAILED' }
        });

        const successRate = totalVerifications > 0
            ? (successfulVerifications / totalVerifications) * 100
            : 0;

        return {
            totalVerifications,
            successfulVerifications,
            failedVerifications,
            successRate: Math.round(successRate * 10) / 10,
        };
    }
}

/**
 * Handles certificate verification logic.
 */
export class VerificationService {

    static async #verifyOnBlockchain(certificateHash) {
        try {
            const res = await fetch(`${BLOCKCHAIN_API_URL}/api/verify-certificate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ certificateHash })
            });
            const data = await res.json();
            return data.isVerified;
        } catch (error) {
            console.error("Blockchain verification error:", error);
            return false;
        }
    }

    static async verifyByCertificateId(certificateId, verifierData) {
        const certificate = await prisma.certificate.findUnique({
            where: { certificateId: certificateId.toUpperCase() }
        });

        if (!certificate) {
            throw new Error("Certificate not found.");
        }

        const isVerifiedOnChain = await this.#verifyOnBlockchain(certificate.certificateHash);

        const verificationResult = isVerifiedOnChain ? 'VERIFIED' : 'FAILED';

        await prisma.verification.create({
            data: {
                certificateId: certificate.id,
                result: verificationResult,
                ...verifierData
            }
        });

        return {
            certificate,
            isVerified: isVerifiedOnChain
        };
    }

    static async verifyByDocument(fileBuffer, verifierData) {
        const fileHash = crypto.createHash('sha256').update(fileBuffer).digest('hex');

        // This assumes the hash is derived *only* from the file content.
        // The institution portal logic adds other data, so a direct match might fail.
        // For a real-world scenario, the hashing logic must be identical.
        // Here we search for a matching hash.

        const certificate = await prisma.certificate.findUnique({
            where: { certificateHash: fileHash }
        });

        if (!certificate) {
            throw new Error("No certificate found matching the document's hash.");
        }

        const isVerifiedOnChain = await this.#verifyOnBlockchain(certificate.certificateHash);
        const verificationResult = isVerifiedOnChain ? 'VERIFIED' : 'FAILED';

        await prisma.verification.create({
            data: {
                certificateId: certificate.id,
                result: verificationResult,
                ...verifierData
            }
        });

        return {
            certificate,
            isVerified: isVerifiedOnChain
        };
    }

    static async getVerificationHistory(userId, limit = 20) {
        return await prisma.verification.findMany({
            where: { userId },
            include: {
                certificate: {
                    select: {
                        studentName: true,
                        certificateId: true,
                        courseName: true,
                        institute: {
                            select: {
                                instituteName: true
                            }
                        }
                    }
                }
            },
            orderBy: { createdAt: 'desc' },
            take: limit
        });
    }
}
