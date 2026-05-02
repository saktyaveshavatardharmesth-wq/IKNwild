import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Count reports by animal type
    const animalStats = await prisma.report.groupBy({
      by: ["animalType"],
      _count: {
        id: true,
      },
    });

    // Monthly stats (simplified for this example)
    const reports = await prisma.report.findMany({
      select: { createdAt: true },
    });

    const monthlyStats: Record<string, number> = {};
    reports.forEach((report) => {
      const month = report.createdAt.toLocaleString("default", { month: "short" });
      monthlyStats[month] = (monthlyStats[month] || 0) + 1;
    });

    return NextResponse.json({
      animalStats: animalStats.map((item) => ({
        type: item.animalType,
        count: item._count.id,
      })),
      monthlyStats: Object.entries(monthlyStats).map(([month, count]) => ({
        month,
        count,
      })),
    });
  } catch (error) {
    console.error("Fetch stats error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
