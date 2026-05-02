import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const reports = await prisma.report.findMany({
      select: {
        id: true,
        animalType: true,
        latitude: true,
        longitude: true,
        status: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(reports);
  } catch (error) {
    console.error("Fetch map data error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
