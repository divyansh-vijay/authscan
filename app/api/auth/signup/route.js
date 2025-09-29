import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { hashPassword, generateToken } from "@/lib/auth";

const prisma = new PrismaClient();

export async function POST(request) {
    try {
        const { firstName, lastName, email, password } = await request.json();

        // --- Validation ---
        if (!firstName || !lastName || !email || !password) {
            return NextResponse.json({ error: "All fields are required." }, { status: 400 });
        }
        if (password.length < 6) {
            return NextResponse.json({ error: "Password must be at least 6 characters long." }, { status: 400 });
        }

        // --- Check for existing user ---
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json({ error: "User with this email already exists." }, { status: 409 });
        }

        // --- Hash password and create user ---
        const hashedPassword = await hashPassword(password);

        const newUser = await prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
                password: hashedPassword,
                // Role defaults to USER as per your schema
            },
        });

        // --- Generate token ---
        const token = generateToken({ userId: newUser.id, email: newUser.email, role: newUser.role });

        // --- Return response (omitting password) ---
        const { password: _, ...userWithoutPassword } = newUser;

        return NextResponse.json({
            message: "User created successfully",
            user: userWithoutPassword,
            token,
        }, { status: 201 });

    } catch (error) {
        console.error("Signup Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
