import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const report = await prisma.report.findUnique({
      where: { id },
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

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { status, updatedBy } = await request.json();
    if (!status || !updatedBy) {
      return NextResponse.json(
        { error: "Status and updatedBy are required" },
        { status: 400 }
      );
    }
    const report = await prisma.report.update({
      where: { id },
      data: { status },
    });
    await prisma.statusUpdate.create({
      data: {
        reportId: id,
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