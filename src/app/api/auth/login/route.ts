import { NextResponse } from "next/server";
import crypto from "crypto";
import { getUserByEmail, setToken } from "@/lib/auth-store";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const user = getUserByEmail(email);

    if (!user || user.password !== password) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const token = crypto.randomUUID();
    setToken(token, user.id);

    const { password: _, ...safeUser } = user;

    return NextResponse.json(
      { user: safeUser, token, message: "Login successful" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
