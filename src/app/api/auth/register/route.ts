import { NextResponse } from "next/server";
import crypto from "crypto";
import { type StoredUser, addUser, getUserByEmail, setToken } from "@/features/auth/stores/auth-store";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { orgName, adminName, email, phone, country, timezone, password } = body;

    if (!orgName || !adminName || !email || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (getUserByEmail(email)) {
      return NextResponse.json(
        { error: "A user with this email already exists" },
        { status: 409 }
      );
    }

    const id = crypto.randomUUID();

    const newUser: StoredUser = {
      id,
      orgName,
      name: adminName,
      email,
      phoneNumber: phone || "",
      country: country || "",
      timezone: timezone || "",
      password,
      role: "ORG_ADMIN",
      createdAt: new Date().toISOString(),
    };

    addUser(newUser);

    const token = crypto.randomUUID();
    setToken(token, newUser.id);

    const { password: _, ...safeUser } = newUser;

    return NextResponse.json(
      { user: safeUser, token, message: "Organization registered successfully" },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
