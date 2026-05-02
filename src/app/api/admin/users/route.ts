import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET /api/admin/users - List all staff
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// POST /api/admin/users - Create new staff (generate code)
export async function POST(request: Request) {
  try {
    const { name, role } = await request.json();

    if (!name || !role) {
      return NextResponse.json({ error: "Name and Role are required" }, { status: 400 });
    }

    // Generate a unique code (Simple version: ROLE + 4 random numbers)
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const code = `${role.substring(0, 3)}_${randomSuffix}`;

    const user = await prisma.user.create({
      data: {
        name,
        role,
        code,
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error("Admin user creation error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
