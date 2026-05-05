"use client";

import { useState } from "react";

interface Props {
  onLocationSelect: (location: { px: number; py: number; label: string }) => void;
  selectedPx?: number;
  selectedPy?: number;
}

export default function MapPicker({ onLocationSelect, selectedPx, selectedPy }: Props) {
  const [pinPos, setPinPos] = useState<{ px: number; py: number } | null>(
    selectedPx ? { px: selectedPx, py: selectedPy! } : null
  );

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * 100;
    const py = ((e.clientY - rect.top) / rect.height) * 100;
    setPinPos({ px, py });
    onLocationSelect({ px, py, label: `Zona ${Math.round(px)}-${Math.round(py)}` });
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100">
      <div className="px-4 pt-3 pb-2">
        <p className="font-bold text-gray-700 text-sm">Pilih Lokasi di Peta</p>
        <p className="text-xs text-gray-400">Tap titik kejadian pada peta</p>
      </div>

      {/* MAP AREA — tap untuk pin */}
      <div
        className="relative w-full cursor-crosshair"
        onClick={handleMapClick}
      >
            <img src="/map.svg" className="w-full block pointer-events-none" />

        {/* Overlay hint kalau belum ada pin */}
        {!pinPos && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-black/30 text-white text-xs font-medium px-3 py-1.5 rounded-full">
              Tap untuk tandai lokasi
            </div>
          </div>
        )}

        {/* Pin yang muncul setelah tap */}
        {pinPos && (
          <div
            className="absolute pointer-events-none"
            style={{
              left: `${pinPos.px}%`,
              top: `${pinPos.py}%`,
              transform: "translate(-50%, -100%)",
            }}
          >
            <svg width="28" height="34" viewBox="0 0 28 34" fill="none">
              <path d="M14 0C7.373 0 2 5.373 2 12c0 8.5 12 22 12 22s12-13.5 12-22C26 5.373 20.627 0 14 0z" fill="#EF4444"/>
              <path d="M14 0C7.373 0 2 5.373 2 12c0 8.5 12 22 12 22s12-13.5 12-22C26 5.373 20.627 0 14 0z" stroke="white" strokeWidth="1.5" fill="none"/>
              <circle cx="14" cy="12" r="4" fill="white"/>
            </svg>
          </div>
        )}
      </div>

      {/* Status */}
      <div className="px-4 py-2.5 border-t border-gray-100">
        {pinPos ? (
          <p className="text-xs text-green-600 font-medium">
            ✓ Lokasi dipilih — tap lagi untuk pindahkan
          </p>
        ) : (
          <p className="text-xs text-gray-400">Belum ada lokasi dipilih</p>
        )}
      </div>
    </div>
  );
}