import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { code } = await request.json();

    if (!code) {
      return NextResponse.json({ error: "Code is required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { code },
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid code" }, { status: 401 });
    }

    // In a real app, you'd set a session cookie or JWT here.
    // For this simple custom auth, we'll return the user info.
    return NextResponse.json({
      id: user.id,
      name: user.name,
      role: user.role,
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
