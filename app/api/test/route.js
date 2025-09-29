import { NextResponse } from "next/server";
import { PrismaClient, Role } from "@prisma/client";
import { hashPassword } from "@/lib/auth";

const prisma = new PrismaClient();

/**
 * Generates a random string of a given length.
 * @param {number} length The length of the random string.
 * @returns {string} The generated random string.
 */
const generateRandomString = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};

/**
 * API handler to create a random user with the INSTITUTE role
 * and a corresponding Institute record.
 */
export async function GET() {
    try {
        // --- 1. Create a Random User for the Institute ---
        const randomIdentifier = generateRandomString(8);
        const userEmail = `institute_admin_${randomIdentifier}@example.com`;
        const userPassword = `${generateRandomString(12)}!1`;

        const hashedPassword = await hashPassword(userPassword);

        const newUser = await prisma.user.create({
            data: {
                firstName: "Institute",
                lastName: `Admin-${randomIdentifier}`,
                email: userEmail,
                password: hashedPassword,
                role: Role.INSTITUTE, // Set role specifically to INSTITUTE
            },
        });

        // --- 2. Create a Random Institute linked to the User ---
        const newInstitute = await prisma.institute.create({
            data: {
                instituteName: `Global Tech Institute ${randomIdentifier}`,
                instituteCode: `GTI${randomIdentifier.toUpperCase()}`,
                address: "123 University Ave, Tech City",
                phone: "555-010" + Math.floor(1000 + Math.random() * 9000),
                website: `https://www.gti-${randomIdentifier}.edu`,
                userId: newUser.id, // Link to the user created above
            },
        });

        // --- 3. Return a Success Response ---
        return NextResponse.json({
            message: "Successfully created a new random institute and its admin user.",
            institute: newInstitute,
            user: {
                id: newUser.id,
                email: newUser.email,
                // Note: We are sending the plain-text password back in the response
                // ONLY because this is a development/testing tool.
                // Do NOT do this in a production environment.
                password: userPassword,
            },
        }, { status: 201 });

    } catch (error) {
        console.error("Failed to create random institute:", error);
        // Provide a more specific error if it's a unique constraint violation
        if (error.code === 'P2002') {
            return NextResponse.json({ error: "A unique constraint failed. Please try again." }, { status: 409 });
        }
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

