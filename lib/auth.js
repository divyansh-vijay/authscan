
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
const prisma = new PrismaClient();


const SALT_ROUNDS = 10;
const JWT_EXPIRES_IN = '7d';
const JWT_SECRET = process.env.JWT_SECRET || 'your-default-secret';

export const signToken = (payload) => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });
};



if (!JWT_SECRET) {
    throw new Error('FATAL ERROR: JWT_SECRET environment variable is not defined.');
}

/**
 * Hashes a plain-text password.
 * @param {string} password The password to hash.
 * @returns {Promise<string>} The hashed password.
 */
export const hashPassword = (password) => {
    return bcrypt.hash(password, SALT_ROUNDS);
};

/**
 * Compares a plain-text password with a hash.
 * @param {string} password The plain-text password.
 * @param {string} hashedPassword The hashed password to compare against.
 * @returns {Promise<boolean>} True if the passwords match.
 */
export const comparePassword = (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
};

/**
 * Generates a JSON Web Token.
 * @param {object} payload The payload to sign.
 * @returns {string} The generated JWT.
 */
export const generateToken = (payload) => {
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
    });
};

/**
 * Verifies a JSON Web Token.
 * @param {string} token The token to verify.
 * @returns {object | null} The decoded payload if valid, otherwise null.
 */
export const verifyToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        return null;
    }
};

export const getAuthDetailsFromRequest = async (request) => {
    // This function bypasses authentication and returns a fixed user and institute ID.
    // This is useful for testing your API endpoints without needing a valid JWT token.
    // You can get real IDs to use here by running the /api/institute/create endpoint.

    const hardcodedInstituteId = "9b2e91b2-7c0e-4ee8-9869-5ab64b2a6cac"; // Example UUID
    const hardcodedUserId = "da05b73e-3048-471d-ac0e-55060325301e"; // Example UUID

    return {
        userId: hardcodedUserId,
        instituteId: hardcodedInstituteId,
        user: {
            id: hardcodedUserId,
            email: "hardcoded.admin@example.com",
            firstName: "Hardcoded",
            lastName: "Admin",
            role: "INSTITUTE",
            institute: {
                id: hardcodedInstituteId,
                instituteName: "Default Test Institute",
                instituteCode: "DTI",
            },
        },
    };
};
// export const getAuthDetailsFromRequest = async (request) => {
//     const authHeader = request.headers.get('authorization');
//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//         return null;
//     }

//     const token = authHeader.substring(7);
//     const decoded = verifyToken(token);

//     if (!decoded || !decoded.userId) {
//         return null;
//     }

//     const user = await prisma.user.findUnique({
//         where: { id: decoded.userId },
//         include: { institute: true },
//     });

//     if (!user) {
//         return null;
//     }

//     return {
//         userId: user.id,
//         instituteId: user.institute?.id,
//         user,
//     };
// };
