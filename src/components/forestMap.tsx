"use client";

import { useState } from "react";

interface Report {
  id: string;
  description: string;
  animalType: string;
  address: string;
  status: string;
  px?: number; // posisi pin dalam % horizontal
  py?: number; // posisi pin dalam % vertikal
}

interface Props {
  reports: Report[];
  onSelectReport: (report: Report) => void;
}

// Koordinat fallback — kalibrasi sesuai SVG kamu
const FALLBACK_COORDS = [
  { px: 42, py: 38 },
  { px: 65, py: 55 },
  { px: 28, py: 68 },
  { px: 55, py: 30 },
  { px: 75, py: 72 },
];

export default function ForestMap({ reports, onSelectReport }: Props) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const pending = reports.filter(r => r.status === "PENDING");

  return (
    <div className="bg-white rounded-2xl overflow-hidden">
      <div className="px-4 pt-3 pb-2">
        <p className="font-bold text-gray-700">Peta Interaktif</p>
        <p className="text-xs text-gray-400">Tap pin untuk lihat detail laporan</p>
      </div>

      {/* MAP AREA */}
      <div
        className="relative w-full"
        onClick={() => setActiveId(null)}
      >
            <img src="/map.svg" className="w-full block" />
        <div className="w-full aspect-[4/3] bg-green-100 flex items-center justify-center">
          <p className="text-gray-400 text-sm">SVG Map IKN kamu masuk di sini</p>
        </div>
        {/* ============================================= */}

        {/* PINS */}
        {pending.map((report, i) => {
          const coord = FALLBACK_COORDS[i % FALLBACK_COORDS.length];
          const px = report.px ?? coord.px;
          const py = report.py ?? coord.py;
          const isActive = activeId === report.id;

          return (
            <div
              key={report.id}
              className="absolute"
              style={{
                left: `${px}%`,
                top: `${py}%`,
                transform: "translate(-50%, -100%)",
                zIndex: isActive ? 20 : 5,
              }}
              onClick={e => {
                e.stopPropagation();
                setActiveId(isActive ? null : report.id);
              }}
            >
              {/* Popup */}
              {isActive && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 w-44 bg-white rounded-xl border border-gray-200 p-3 shadow-md pointer-events-none">
                  <p className="text-xs font-semibold text-gray-900 leading-snug mb-1">
                    {report.description}
                  </p>
                  <p className="text-[10px] text-gray-500">🐾 {report.animalType}</p>
                  <p className="text-[10px] text-gray-500">📍 {report.address}</p>
                  <button
                    className="mt-2 w-full bg-red-500 text-white text-[10px] font-bold py-1.5 rounded-lg pointer-events-auto"
                    onClick={e => { e.stopPropagation(); onSelectReport(report); }}
                  >
                    Selengkapnya →
                  </button>
                </div>
              )}

              {/* Pin */}
              <div className={`transition-transform ${isActive ? "scale-125" : "hover:scale-110"} origin-bottom cursor-pointer`}>
                <svg width="28" height="34" viewBox="0 0 28 34" fill="none">
                  <path d="M14 0C7.373 0 2 5.373 2 12c0 8.5 12 22 12 22s12-13.5 12-22C26 5.373 20.627 0 14 0z" fill="#EF4444"/>
                  <path d="M14 0C7.373 0 2 5.373 2 12c0 8.5 12 22 12 22s12-13.5 12-22C26 5.373 20.627 0 14 0z" stroke="white" strokeWidth="1.5" fill="none"/>
                  <text x="14" y="14" textAnchor="middle" dominantBaseline="central" fill="white" fontSize="9" fontWeight="bold" fontFamily="sans-serif">
                    #{i + 1}
                  </text>
                </svg>
              </div>
            </div>
          );
        })}
      </div>

      <div className="px-4 py-2 flex items-center gap-2 border-t border-gray-100">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />
        <span className="text-xs text-gray-400">Laporan belum ditangani</span>
      </div>
    </div>
  );
}