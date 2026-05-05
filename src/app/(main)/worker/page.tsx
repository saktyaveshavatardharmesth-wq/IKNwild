"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Clock, MapPin } from "lucide-react";

export default function WorkerDashboard() {
  const [reports, setReports] = useState<any[]>([]);
  const [user, setUser] = useState<{ name: string; id: string; role: string } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      fetchReports(parsedUser.id);
    }

    const handleFocus = () => {
      const stored = localStorage.getItem("user");
      if (stored) {
        const parsed = JSON.parse(stored);
        fetchReports(parsed.id);
      }
    };
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  const fetchReports = async (userId: string) => {
    const res = await fetch(`/api/reports?role=CONSTRUCTION_WORKER&userId=${userId}`);
    const data = await res.json();
    setReports(Array.isArray(data) ? data : []);
  };

  if (!user) return null;

  return (
      <div className="min-h-screen bg-[#E8F0E5] px-4 py-12">

        <h1 className="text-3xl font-bold text-primary-1000 mb-6">
          Laporkan Temuan di Lapangan!
        </h1>

        <div className="bg-white rounded-2xl p-5 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-1">Menemukan Satwa Liar?</h2>
          <p className="text-sm text-gray-500 mb-4">
            Laporkan keberadaan satwa liar atau aktivitas mencurigakan di sekitar area kerja.
          </p>
          <Link
            href="/worker/report"
            className="block w-full bg-primary-1000 text-white font-bold py-3 rounded-xl text-center"
          >
            Lapor Sekarang
          </Link>
        </div>

        <div className="bg-white rounded-2xl overflow-hidden">
          <h2 className="text-2xl font-bold text-primary-1000 mb-3 border-b h-16 items-center justify-between flex p-2 bg-[#F3F4ED]">Riwayat Laporan</h2>
          {reports.length === 0 ? (
            <div className="p-8 text-center text-gray-400 border border-dashed rounded-2xl">
              Belum ada laporan yang dikirim.
            </div>
          ) : (
            reports.map((report: any, index: number) => (
              <div
                key={report.id}
                className="p-4 flex items-start gap-3 border-b last:border-0"
              >
                <span className={`text-sm font-bold px-2 py-1 rounded-full min-w-[36px] text-center ${
                  report.status === "PENDING" ? "bg-red-100 text-red-500" :
                  report.status === "IN_PROGRESS" ? "bg-yellow-100 text-yellow-700" :
                  "bg-green-100 text-green-700"
                }`}>
                  #{reports.length - index}
                </span>
                <div className="flex-1">
                  <p className="font-bold text-gray-900">{report.description}</p>
                  <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                    <MapPin className="h-3 w-3" />
                    <span>{report.address}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <span>🐾</span>
                    <span>{report.animalType}</span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="h-3 w-3" />
                      <span>
                        {new Date(report.createdAt).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <StatusBadge status={report.status} />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const configs: any = {
    PENDING: { color: "bg-red-100 text-red-600", label: "BELUM DITANGANI" },
    IN_PROGRESS: { color: "bg-yellow-100 text-yellow-700", label: "SEDANG DITANGANI" },
    RESOLVED: { color: "bg-green-100 text-green-700", label: "SUDAH DITANGANI" },
  };
  const config = configs[status] || configs.PENDING;
  return (
    <span className={`text-xs font-bold px-2 py-1 rounded-full whitespace-nowrap ${config.color}`}>
      {config.label}
    </span>
  );
}