/* eslint-disable @typescript-eslint/no-explicit-any */
import connectDB from "@/lib/db";
import { User } from "@/lib/model/user.model";
import { createToken } from "@/utils/token_helper";
import { type NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const { email, password } = await request.json();
    console.log("Login request data:", { email, password });

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "No user exists" }, { status: 401 });
    }

    // Check password
    const isValid = await bcrypt.compare(password, user.password);
    console.log("Password validation result:", isValid);

    if (!isValid) {
      return NextResponse.json(
        { message: "Password is incorrect" },
        { status: 401 }
      );
    }

    // Generate token
    const token = createToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    });
    const response = NextResponse.json({
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return response;
  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
