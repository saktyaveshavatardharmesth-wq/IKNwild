"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, MapPin, User, Clock, CheckCircle2, AlertCircle, Phone } from "lucide-react";

export default function RangerReportDetail({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [report, setReport] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [reportId, setReportId] = useState<string>("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
    
    params.then((p) => {
      setReportId(p.id);
    });
  }, []);

  const fetchReport = async () => {
    if (!reportId) return;
    try {
      const res = await fetch(`/api/reports/${reportId}`);
      const data = await res.json();
      setReport(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (reportId) fetchReport();
  }, [reportId]);

  const updateStatus = async (status: string) => {
    if (!user || !reportId) return;
    try {
      await fetch(`/api/reports/${reportId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, updatedBy: user.id }),
      });
      fetchReport();
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading || !report) return null;

  return (
    <div className="container mx-auto px-4 py-8 pb-32">
      <button
        onClick={() => router.back()}
        className="mb-6 flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-forest-green"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Dashboard
      </button>

      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-extrabold text-slate-900">{report.animalType}</h1>
        <StatusBadge status={report.status} />
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Left Column: Details */}
        <div className="space-y-6">
          <section className="rounded-3xl border bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-bold text-slate-900">Incident Details</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Clock className="mt-1 h-5 w-5 text-slate-400" />
                <div>
                  <p className="text-xs font-bold uppercase text-slate-400">Reported At</p>
                  <p className="font-medium">{new Date(report.createdAt).toLocaleString()}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <User className="mt-1 h-5 w-5 text-slate-400" />
                <div>
                  <p className="text-xs font-bold uppercase text-slate-400">Reporter</p>
                  <p className="font-medium">{report.reporter?.name} (Worker)</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <AlertCircle className="mt-1 h-5 w-5 text-slate-400" />
                <div>
                  <p className="text-xs font-bold uppercase text-slate-400">Description</p>
                  <p className="font-medium">{report.description}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Action Buttons */}
          <section className="grid grid-cols-2 gap-4">
            <button
              onClick={() => updateStatus("IN_PROGRESS")}
              className="flex items-center justify-center gap-2 rounded-2xl bg-blue-600 py-4 font-bold text-white shadow-lg shadow-blue-200"
            >
              Respond
            </button>
            <button
              onClick={() => updateStatus("RESOLVED")}
              className="flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 py-4 font-bold text-white shadow-lg shadow-emerald-200"
            >
              Resolve
            </button>
          </section>

          <button className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-slate-200 bg-white py-4 font-bold text-slate-600">
            <Phone className="h-5 w-5" />
            Contact Reporter
          </button>
        </div>

        {/* Right Column: Map & Photo */}
        <div className="space-y-6">
          <div className="overflow-hidden rounded-3xl border bg-white shadow-sm">
            <div className="bg-slate-50 p-4 font-bold text-slate-700 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-red-500" />
              Sighting Location (SVG Map)
            </div>
            <div className="relative w-full aspect-[390/398] bg-[#A8D4E8] flex items-center justify-center">
              <img src="/map.svg" className="w-full h-full block object-contain" alt="IKN Map" />
              {report.px !== undefined && report.py !== undefined && (
                <div 
                  className="absolute"
                  style={{
                    left: `${report.px}%`,
                    top: `${report.py}%`,
                    transform: "translate(-50%, -100%)",
                  }}
                >
                  <div className="relative">
                    <div className="absolute left-1/2 top-full -translate-x-1/2 h-16 w-16 -translate-y-full rounded-full border-2 border-red-500 bg-red-500/20 animate-pulse"></div>
                    <AlertCircle className="h-8 w-8 text-red-600 drop-shadow-lg" />
                  </div>
                </div>
              )}
            </div>
            <div className="p-4 text-sm text-slate-500 border-t">
              {report.address}
              {report.latitude && report.longitude && (
                <p className="mt-1 text-xs text-slate-400">
                  GPS: {report.latitude.toFixed(4)}, {report.longitude.toFixed(4)}
                </p>
              )}
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border bg-white shadow-sm">
            <div className="bg-slate-50 p-4 font-bold text-slate-700">Attached Photo</div>
            <div className="aspect-video bg-slate-100 flex items-center justify-center text-slate-400">
               {report.imageUrl ? (
                 <img src={report.imageUrl} alt="Animal" className="h-full w-full object-cover" />
               ) : (
                 "No photo provided"
               )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const configs: any = {
    PENDING: { color: "bg-red-100 text-red-700", label: "URGENT" },
    IN_PROGRESS: { color: "bg-blue-100 text-blue-700", label: "HANDLING" },
    RESOLVED: { color: "bg-emerald-100 text-emerald-700", label: "CLOSED" },
  };
  const config = configs[status] || configs.PENDING;
  return (
    <span className={`rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-widest ${config.color}`}>
      {config.label}
    </span>
  );
}
