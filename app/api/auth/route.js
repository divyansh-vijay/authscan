import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export async function POST(req) {
  try {
    const body = await req.json();
    const {action, firstName, lastName, email, password, role} = body;

    if (action === "signup") {
      if (!firstName || !lastName || !email || !password || !role) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
      }

      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        return NextResponse.json({ error: "Email already registered" }, { status: 400 });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user
      const newUser = await prisma.user.create({
        data: {
          firstName,
          lastName,
          email,
          password: hashedPassword,
          role,
        },
      });

      // If role is INSTITUTE, create institute record
      if (role === "INSTITUTE") {
        if (!instituteName) {
          return NextResponse.json({ error: "Institute name required" }, { status: 400 });
        }

        await prisma.institute.create({
          data: {
            instituteName,
            userId: newUser.id,
          },
        });
      }

      return NextResponse.json({ message: "Signup successful" }, { status: 201 });
    }

    if (action === "login") {
      if (!email || !password) {
        return NextResponse.json({ error: "Email and password required" }, { status: 400 });
      }

      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: "1h" }
      );

      return NextResponse.json({ message: "Login successful", token, role: user.role }, { status: 200 });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
