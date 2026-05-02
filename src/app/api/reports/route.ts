import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET /api/reports - List reports
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const role = searchParams.get("role");
    const userId = searchParams.get("userId");

    let where = {};
    
    // If it's a construction worker, they only see their own reports (per flow description)
    // Actually flow says "View report history", usually means their own.
    // Forest Ranger sees all.
    if (role === "CONSTRUCTION_WORKER" && userId) {
      where = { reporterId: userId };
    }

    const reports = await prisma.report.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        reporter: {
          select: { name: true, role: true },
        },
      },
    });

    return NextResponse.json(reports);
  } catch (error) {
    console.error("Fetch reports error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// POST /api/reports - Create a report
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      description,
      animalType,
      imageUrl,
      latitude,
      longitude,
      address,
      reporterId,
    } = body;

    if (!description || !animalType || !latitude || !longitude || !reporterId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const report = await prisma.report.create({
      data: {
        description,
        animalType,
        imageUrl,
        latitude,
        longitude,
        address,
        reporterId,
        status: "PENDING",
      },
    });

    // Create initial status history
    await prisma.statusUpdate.create({
      data: {
        reportId: report.id,
        status: "PENDING",
        updatedBy: reporterId,
      },
    });

    return NextResponse.json(report, { status: 201 });
  } catch (error) {
    console.error("Create report error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
