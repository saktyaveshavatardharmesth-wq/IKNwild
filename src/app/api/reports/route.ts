import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const role = searchParams.get("role");
    const userId = searchParams.get("userId");
    let where = {};
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
      reporterName,
      notes,
      mapX,
      mapY,
    } = body;

    if (!description || !animalType || !reporterId) {
      return NextResponse.json(
        { error: "Missing required fields (description, animalType, or reporterId)" },
        { status: 400 }
      );
    }

    // Update reporter name if provided
    if (reporterName) {
      await prisma.user.update({
        where: { id: reporterId },
        data: { name: reporterName },
      });
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
        notes,
        px: mapX,
        py: mapY,
        status: "PENDING",
      },
    });

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