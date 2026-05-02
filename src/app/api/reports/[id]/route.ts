import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET /api/reports/[id] - Get report details
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const report = await prisma.report.findUnique({
      where: { id: params.id },
      include: {
        reporter: {
          select: { name: true, role: true },
        },
        history: {
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!report) {
      return NextResponse.json({ error: "Report not found" }, { status: 404 });
    }

    return NextResponse.json(report);
  } catch (error) {
    console.error("Fetch report error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// PATCH /api/reports/[id] - Update report status
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { status, updatedBy } = await request.json();

    if (!status || !updatedBy) {
      return NextResponse.json(
        { error: "Status and updatedBy are required" },
        { status: 400 }
      );
    }

    const report = await prisma.report.update({
      where: { id: params.id },
      data: { status },
    });

    await prisma.statusUpdate.create({
      data: {
        reportId: params.id,
        status,
        updatedBy,
      },
    });

    return NextResponse.json(report);
  } catch (error) {
    console.error("Update report error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
