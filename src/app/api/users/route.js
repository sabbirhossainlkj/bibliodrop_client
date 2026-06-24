import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function POST(request) {
  try {
    const { name, email, role, password } = await request.json();

    if (!name || !email || !role || !password) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    if (role === "admin") {
      return NextResponse.json({ message: "Cannot create admin role from here" }, { status: 400 });
    }

    // Use better-auth's internal API to create a real auth user
    const ctx = await auth.$context;
    const hashedPassword = await ctx.password.hash(password);

    const user = await ctx.internalAdapter.createUser({
      name,
      email,
      emailVerified: true,
      role,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Create account (credential) for the user
    await ctx.internalAdapter.createAccount({
      userId: user.id,
      providerId: "credential",
      accountId: user.id,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json({ success: true, insertedId: user.id });
  } catch (error) {
    console.error("Failed to create user:", error);
    return NextResponse.json({ message: error.message || "Internal server error" }, { status: 500 });
  }
}
