"use client";

import { useState } from "react";

// Data populasi per hewan per zona
const animalData: Record<string, Record<string, number>> = {
  Orangutan:    { zone1: 80,  zone2: 100, zone3: 130, zone4: 50,  zone5: 140, zone6: 0  },
  Bekantan:     { zone1: 20,  zone2: 30,  zone3: 20,  zone4: 70,  zone5: 40,  zone6: 0  },
  "Beruang Madu": { zone1: 25, zone2: 35, zone3: 0,  zone4: 40,  zone5: 30,  zone6: 0  },
  Ular:         { zone1: 20,  zone2: 0,   zone3: 10,  zone4: 20,  zone5: 40,  zone6: 0  },
  "Babi Hutan": { zone1: 20,  zone2: 10,  zone3: 0,   zone4: 20,  zone5: 10,  zone6: 0  },
  Musang:       { zone1: 10,  zone2: 0,   zone3: 10,  zone4: 0,   zone5: 10,  zone6: 0  },
};

const ZONE_NAMES: Record<string, string> = {
  zone1: "Wilayah Barat",
  zone2: "Wilayah Tengah",
  zone3: "Wilayah Timur Laut",
  zone4: "Wilayah Utara",
  zone5: "Wilayah Timur",
  zone6: "Wilayah Selatan",
};

function getHeatColor(value: number, max: number): string {
  if (value === 0 || max === 0) return "#E4EEE2";
  const ratio = value / max;
  if (ratio > 0.8) return "#1B3E1F";
  if (ratio > 0.6) return "#2E6335";
  if (ratio > 0.4) return "#375532";
  if (ratio > 0.2) return "#55844C";
  if (ratio > 0.05) return "#78AB6E";
  return "#AECDA8";
}

interface Props {
  currentAnimal: string;
}

export default function InteractiveMap({ currentAnimal }: Props) {
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);

  const data = animalData[currentAnimal] ?? {};
  const maxVal = Math.max(...Object.values(data));

  const zoneColor = (zoneId: string) => getHeatColor(data[zoneId] ?? 0, maxVal);

  const tooltipText = hoveredZone
    ? `${ZONE_NAMES[hoveredZone]}: ${data[hoveredZone] ?? 0} ekor`
    : null;

  return (
    // Wrapper dibuat punya aspect ratio dan centering agar peta tidak melar/gepeng
    <div className="relative rounded-xl overflow-hidden bg-[#A8D4E8] w-full aspect-[4/5] flex items-center justify-center p-4">
      <span className="absolute top-3 left-3 z-10 bg-white text-xs font-bold px-2 py-1 rounded-lg shadow">
        PETA INTERAKTIF
      </span>

      {tooltipText && (
        <div className="absolute top-3 right-3 z-10 bg-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow border border-gray-100 transition-opacity">
          {tooltipText}
        </div>
      )}

      <svg
        /* ⚠️ PENTING: GANTI viewBox INI DENGAN viewBox DARI SVG FIGMA-MU! ⚠️ */
        viewBox="0 0 390 398" 
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-contain drop-shadow-md"
      >
        {/* Zone 1 */}
        <path
          d="MASUKIN_PATH_ZONA_1_KAMU_DISINI"
          fill={zoneColor("zone1")}
          className="transition-all duration-300 cursor-pointer hover:brightness-90"
          onMouseEnter={() => setHoveredZone("zone1")}
          onMouseLeave={() => setHoveredZone(null)}
        />
        {/* Zone 2 */}
        <path
          d="MASUKIN_PATH_ZONA_2_KAMU_DISINI"
          fill={zoneColor("zone2")}
          className="transition-all duration-300 cursor-pointer hover:brightness-90"
          onMouseEnter={() => setHoveredZone("zone2")}
          onMouseLeave={() => setHoveredZone(null)}
        />
        {/* Zone 3 */}
        <path
          d="MASUKIN_PATH_ZONA_3_KAMU_DISINI"
          fill={zoneColor("zone3")}
          className="transition-all duration-300 cursor-pointer hover:brightness-90"
          onMouseEnter={() => setHoveredZone("zone3")}
          onMouseLeave={() => setHoveredZone(null)}
        />
        {/* Zone 4 */}
        <path
          d="MASUKIN_PATH_ZONA_4_KAMU_DISINI"
          fill={zoneColor("zone4")}
          className="transition-all duration-300 cursor-pointer hover:brightness-90"
          onMouseEnter={() => setHoveredZone("zone4")}
          onMouseLeave={() => setHoveredZone(null)}
        />
        {/* Zone 5 */}
        <path
          d="MASUKIN_PATH_ZONA_5_KAMU_DISINI"
          fill={zoneColor("zone5")}
          className="transition-all duration-300 cursor-pointer hover:brightness-90"
          onMouseEnter={() => setHoveredZone("zone5")}
          onMouseLeave={() => setHoveredZone(null)}
        />
        {/* Zone 6 */}
        <path
          d="MASUKIN_PATH_ZONA_6_KAMU_DISINI"
          fill={zoneColor("zone6")}
          className="transition-all duration-300 cursor-pointer hover:brightness-90"
          onMouseEnter={() => setHoveredZone("zone6")}
          onMouseLeave={() => setHoveredZone(null)}
        />

        {/* Outline Gabungan (Kalau ada) */}
        <path
          fill="none"
          stroke="#283E24"
          strokeWidth="2"
          d="MASUKIN_PATH_OUTLINE_GARIS_KAMU_DISINI"
          className="pointer-events-none"
        />
      </svg>

      {/* Legend dipindah melayang di bawah supaya lebih rapi seperti UI map modern */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/70 backdrop-blur-sm flex items-center justify-center gap-3 py-2 px-2 flex-wrap border-t border-white/50">
        {[
          { color: "#1B3E1F", label: "Sangat Tinggi" },
          { color: "#55844C", label: "Sedang" },
          { color: "#AECDA8", label: "Rendah" },
          { color: "#E4EEE2", label: "Tidak Ada" },
        ].map(({ color, label }) => (
          <div key={label} className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm inline-block shadow-sm" style={{ background: color }} />
            <span className="text-[10px] text-gray-700 font-semibold">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}