import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const SECRET = process.env.NEXT_PUBLIC_JWT_SECRET;

export function middleware(req) {
  const authHeader = req.headers.get("authorization");
  const url = req.nextUrl.clone();

  // No token -> redirect to login
  if (!authHeader) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET);
    const role = decoded.role;

    // USER can only access /employer/*
    if (req.nextUrl.pathname.startsWith("/employer") && role !== "USER") {
      url.pathname = "/institution"; // send them to their dashboard
      return NextResponse.redirect(url);
    }

    // INSTITUTE can only access /institution/*
    if (req.nextUrl.pathname.startsWith("/institution") && role !== "INSTITUTE") {
      url.pathname = "/employer"; // send them to their dashboard
      return NextResponse.redirect(url);
    }

    return NextResponse.next(); // ✅ allow
  } catch (err) {
    // Invalid token
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ["/employer", "/institution"], // protect only these
};
