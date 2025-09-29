import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { signToken } from '@/lib/auth';

const prisma = new PrismaClient();

export async function POST(request) {
    try {
        const { email, password } = await request.json();

        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        const token = signToken({ userId: user.id });

        return NextResponse.json({ token });
    } catch (error) {
        console.error("Auth Error:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}