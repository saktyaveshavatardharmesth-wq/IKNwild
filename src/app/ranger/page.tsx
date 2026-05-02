"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Bell, MapPin, Eye, Clock, CheckCircle2, AlertCircle } from "lucide-react";

export default function RangerDashboard() {
  const [reports, setReports] = useState([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      fetchReports();
    }

    // Refresh every 30 seconds for real-time feel
    const interval = setInterval(fetchReports, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchReports = async () => {
    const res = await fetch("/api/reports?role=FOREST_RANGER");
    const data = await res.json();
    setReports(data);
  };

  if (!user) return null;

  const newReports = reports.filter((r: any) => r.status === "PENDING");
  const inProgress = reports.filter((r: any) => r.status === "IN_PROGRESS");

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Command Center</h1>
          <p className="text-slate-500">Active Ranger: {user.name}</p>
        </div>
        <div className="relative rounded-full bg-forest-green/10 p-2 text-forest-green">
          <Bell className="h-6 w-6" />
          {newReports.length > 0 && (
            <span className="absolute right-0 top-0 flex h-3 w-3 rounded-full bg-red-500 ring-2 ring-white"></span>
          )}
        </div>
      </header>

      {/* Alerts Section */}
      <section className="mb-10">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-red-600 uppercase tracking-wider">
          <AlertCircle className="h-5 w-5" />
          Immediate Attention ({newReports.length})
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          {newReports.length === 0 ? (
            <div className="col-span-full rounded-2xl bg-slate-50 p-8 text-center text-slate-400 border border-dashed">
              No new alerts. All clear!
            </div>
          ) : (
            newReports.map((report: any) => (
              <AlertCard key={report.id} report={report} />
            ))
          )}
        </div>
      </section>

      {/* Ongoing Tasks */}
      <section>
        <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-700">
          <Clock className="h-5 w-5" />
          In Progress ({inProgress.length})
        </h2>
        <div className="space-y-4">
          {inProgress.map((report: any) => (
            <ReportItem key={report.id} report={report} />
          ))}
        </div>
      </section>
    </div>
  );
}

function AlertCard({ report }: { report: any }) {
  return (
    <div className="group rounded-3xl border-2 border-red-100 bg-white p-6 shadow-md transition-all hover:border-red-200">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <div className="mb-1 flex items-center gap-1.5 text-xs font-black uppercase text-red-600">
            <span className="flex h-2 w-2 rounded-full bg-red-600 animate-pulse"></span>
            New Sighting
          </div>
          <h3 className="text-2xl font-black text-slate-900">{report.animalType}</h3>
        </div>
        <div className="rounded-2xl bg-slate-100 p-3">
          <MapPin className="h-6 w-6 text-slate-400" />
        </div>
      </div>
      
      <p className="mb-6 line-clamp-2 text-slate-600 font-medium">{report.description}</p>
      
      <div className="flex gap-3">
        <Link
          href={`/ranger/report/${report.id}`}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-forest-green py-3 font-bold text-white shadow-lg shadow-forest-green/20"
        >
          <Eye className="h-5 w-5" />
          Quick View
        </Link>
      </div>
    </div>
  );
}

function ReportItem({ report }: { report: any }) {
  return (
    <Link
      href={`/ranger/report/${report.id}`}
      className="flex items-center justify-between rounded-2xl border bg-white p-4 transition-colors hover:bg-slate-50"
    >
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <Clock className="h-6 w-6" />
        </div>
        <div>
          <h3 className="font-bold text-slate-900">{report.animalType}</h3>
          <p className="text-sm text-slate-500">Reported by {report.reporter?.name}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 font-bold text-blue-600 text-sm">
        Details <Eye className="h-4 w-4" />
      </div>
    </Link>
  );
}
