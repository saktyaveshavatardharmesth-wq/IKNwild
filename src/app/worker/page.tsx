"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, History, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function WorkerDashboard() {
  const [reports, setReports] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      fetchReports(parsedUser.id);
    }
  }, []);

  const fetchReports = async (userId: string) => {
    const res = await fetch(`/api/reports?role=CONSTRUCTION_WORKER&userId=${userId}`);
    const data = await res.json();
    setReports(data);
  };

  if (!user) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Welcome, {user.name}</h1>
        <p className="text-slate-500">Construction Site Area A</p>
      </header>

      {/* Primary Action */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="mb-12"
      >
        <Link
          href="/worker/report"
          className="flex h-32 w-full flex-col items-center justify-center gap-2 rounded-3xl bg-alert-orange text-white shadow-lg shadow-alert-orange/20 transition-all hover:bg-alert-orange/90"
        >
          <Plus className="h-10 w-10" />
          <span className="text-xl font-extrabold uppercase tracking-wider">
            Report Wildlife Sighting
          </span>
        </Link>
      </motion.div>

      {/* History Section */}
      <section>
        <div className="mb-4 flex items-center gap-2 text-slate-700">
          <History className="h-5 w-5" />
          <h2 className="text-lg font-bold">My Recent Reports</h2>
        </div>

        <div className="space-y-4">
          {reports.length === 0 ? (
            <div className="rounded-2xl border border-dashed p-12 text-center text-slate-400">
              No reports submitted yet.
            </div>
          ) : (
            reports.map((report: any) => (
              <div
                key={report.id}
                className="flex items-center justify-between rounded-2xl border bg-white p-4 shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100">
                    <span className="text-xl">🐾</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{report.animalType}</h3>
                    <p className="text-sm text-slate-500">{new Date(report.createdAt).toLocaleString()}</p>
                  </div>
                </div>
                <StatusTag status={report.status} />
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}

function StatusTag({ status }: { status: string }) {
  const configs: any = {
    PENDING: { color: "bg-amber-100 text-amber-700", icon: <Clock className="h-4 w-4" />, label: "Pending" },
    IN_PROGRESS: { color: "bg-blue-100 text-blue-700", icon: <AlertCircle className="h-4 w-4" />, label: "In Progress" },
    RESOLVED: { color: "bg-emerald-100 text-emerald-700", icon: <CheckCircle2 className="h-4 w-4" />, label: "Resolved" },
  };

  const config = configs[status] || configs.PENDING;

  return (
    <div className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-tight ${config.color}`}>
      {config.icon}
      <span>{config.label}</span>
    </div>
  );
}
