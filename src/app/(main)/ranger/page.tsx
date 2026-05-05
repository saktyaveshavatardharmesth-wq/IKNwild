"use client";

import { useEffect, useState } from "react";
import { Bell, MapPin, Clock, AlertCircle, X } from "lucide-react";
import ForestMap from "@/components/forestMap";

export default function RangerDashboard() {
  const [reports, setReports] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      fetchReports();
    }
    const interval = setInterval(fetchReports, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchReports = async () => {
    const res = await fetch("/api/reports?role=FOREST_RANGER");
    const data = await res.json();
    setReports(Array.isArray(data) ? data : []);
  };

  const updateStatus = async (status: string) => {
    if (!selectedReport || !user) return;
    setIsUpdating(true);
    try {
      await fetch(`/api/reports/${selectedReport.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, updatedBy: user.id }),
      });
      await fetchReports();
      setSelectedReport(null);
    } catch (err) {
      console.error(err);
    } finally {
      setIsUpdating(false);
    }
  };

  if (!user) return null;

  const newReports = reports.filter((r: any) => r.status === "PENDING");
  const latestAlert = newReports[0];

  return (
    <div className="min-h-screen bg-[#E8F0E5] px-4 py-6">

      {/* Header */}
      <h1 className="text-3xl font-bold text-primary-1000 mb-6">
        Cek Lapangan Sekarang!
      </h1>

      {/* Alert Card */}
      {latestAlert && (
        <div className="bg-[#F5EDE8] rounded-2xl p-4 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded">
              PERINGATAN
            </span>
            <span className="text-xs text-gray-500">
              {latestAlert?.createdAt ? new Date(latestAlert.createdAt).toLocaleString("id-ID", {
                day: "numeric",
                month: "short",
                hour: "2-digit",
                minute: "2-digit",
              }) : ""}
            </span>
          </div>
          <p className="font-bold text-gray-900 mb-1">{latestAlert?.description}</p>
          <div className="flex items-center gap-1 text-sm text-gray-600 mb-1">
            <span>🐾</span>
            <span>{latestAlert?.animalType}</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-600 mb-4">
            <MapPin className="h-4 w-4" />
            <span>{latestAlert?.address}</span>
          </div>
          <button
            onClick={() => setSelectedReport(latestAlert)}
            className="w-full bg-primary-1000 text-white font-bold py-3 rounded-xl"
          >
            Selengkapnya
          </button>
        </div>
      )}

      {/* Riwayat Laporan */}
{/* Riwayat Laporan */}
<div className="bg-white rounded-2xl overflow-hidden mb-6">
  <h2 className="text-2xl font-bold text-primary-1000 mb-3 border-b h-16 items-center flex p-4 bg-[#F3F4ED]">
    Riwayat Laporan
  </h2>
  {reports.length === 0 ? (
    <div className="p-8 text-center text-gray-400 border border-dashed rounded-2xl">
      Belum ada laporan.
    </div>
  ) : (
    reports.map((report: any, index: number) => (
      <button
        key={report.id}
        onClick={() => setSelectedReport(report)}
        className="w-full text-left p-4 flex items-start gap-3 border-b last:border-0"
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
                {report.createdAt ? new Date(report.createdAt).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                }) : ""}
              </span>
            </div>
            <StatusBadge status={report.status} />
          </div>
        </div>
      </button>
    ))
  )}
</div>

      {/* Lokasi Pemantauan */}
      <div className="mb-6">
        <h2 className="font-bold text-2xl text-primary-1000 mb-1">Lokasi Pemantauan</h2>
        <p className="text-sm text-gray-600 mb-3">
          Gunakan peta untuk melihat lokasi laporan dan segera lakukan pengecekan
        </p>
        <div className="bg-white rounded-2xl p-4">
          <p className="font-bold text-gray-700 mb-2">Peta Interaktif</p>
          <div className="rounded-xl overflow-hidden h-48 bg-gray-200 flex items-center justify-center">
            <ForestMap reports={reports} onSelectReport={setSelectedReport} />
          </div>
        </div>
      </div>

      {/* Modal Detail */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-end justify-center">
          <div className="bg-white w-full max-w-md rounded-t-3xl p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Detail Laporan</h2>
              <button onClick={() => setSelectedReport(null)}>
                <X className="h-6 w-6" />
              </button>
            </div>

            {selectedReport.imageUrl && (
              <img
                src={selectedReport.imageUrl}
                alt="foto laporan"
                className="w-full h-48 object-cover rounded-xl mb-4"
              />
            )}

            <div className="space-y-3 border-t pt-3">
              <div>
                <p className="text-xs text-gray-400">Nama Pelapor</p>
                <p className="font-medium">{selectedReport.reporter?.name ?? "-"}</p>
              </div>
              <div className="border-t pt-3">
                <p className="text-xs text-gray-400">Deskripsi Temuan</p>
                <p className="font-medium">{selectedReport.description}</p>
              </div>
              <div className="border-t pt-3 flex gap-4">
                <div>
                  <p className="text-xs text-gray-400">Jenis Satwa</p>
                  <div className="mt-1 border rounded-xl p-2 flex flex-col items-center w-20">
                    <span className="text-2xl">🐾</span>
                    <p className="text-xs font-medium text-center">{selectedReport.animalType}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Lokasi</p>
                  <p className="font-bold">{selectedReport.address}</p>
                </div>
              </div>
            </div>
            {selectedReport.notes && (
                <div className="border-t pt-3">
                  <p className="text-xs text-gray-400">Catatan Tambahan</p>
                  <p className="text-sm text-gray-700">{selectedReport.notes}</p>
                </div>
              )}

            {/* Action Buttons */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => updateStatus("RESOLVED")}
                disabled={isUpdating || selectedReport.status === "RESOLVED"}
                className="flex-1 border border-primary-1000 text-primary-1000 font-bold py-3 rounded-xl disabled:opacity-50"
              >
                Telah Selesai
              </button>
              <button
                onClick={() => updateStatus("IN_PROGRESS")}
                disabled={isUpdating || selectedReport.status === "IN_PROGRESS"}
                className="flex-1 bg-primary-1000 text-white font-bold py-3 rounded-xl disabled:opacity-50"
              >
                Tangani Sekarang
              </button>
            </div>
          </div>
        </div>
      )}
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