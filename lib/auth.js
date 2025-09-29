
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
    const authHeader = request.headers.get('Authorization');
    console.log({ authHeader })
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return null;
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);
    console.log({ decoded })
    if (!decoded || !decoded.userId) {
        return null;
    }

    const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        include: { institute: true },
    });

    if (!user) {
        return null;
    }

    return {
        userId: user.id,
        instituteId: user.institute?.id,
        user,
    };
};
