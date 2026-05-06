"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ZoomIn, ZoomOut, Move } from "lucide-react";

interface Props {
  onLocationSelect: (location: { px: number; py: number; label: string }) => void;
  selectedPx?: number;
  selectedPy?: number;
}

export default function MapPicker({ onLocationSelect, selectedPx, selectedPy }: Props) {
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
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

  const zoomIn = () => setScale(prev => Math.min(prev + 0.5, 4));
  const zoomOut = () => setScale(prev => Math.max(prev - 0.5, 1));
  const resetZoom = () => {
    setScale(1);
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 flex flex-col items-center">
      <div className="w-full px-4 pt-3 pb-2 flex justify-between items-center">
        <div>
          <p className="font-bold text-gray-700 text-sm">Pilih Lokasi di Peta</p>
          <p className="text-xs text-gray-400">Gunakan pinch/drag untuk navigasi</p>
        </div>
        <div className="flex gap-2">
          <button 
            type="button"
            onClick={zoomOut}
            className="p-1.5 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="h-4 w-4 text-gray-600" />
          </button>
          <button 
            type="button"
            onClick={zoomIn}
            className="p-1.5 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="h-4 w-4 text-gray-600" />
          </button>
          <button 
            type="button"
            onClick={resetZoom}
            className="p-1.5 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            title="Reset"
          >
            <span className="text-[10px] font-bold text-gray-600 px-1">RESET</span>
          </button>
        </div>
      </div>

      {/* MAP AREA — tap untuk pin */}
      <div
        ref={containerRef}
        className="relative w-full max-w-[400px] overflow-hidden bg-slate-50"
        style={{ aspectRatio: "390 / 398" }}
      >
        <motion.div
          drag
          dragConstraints={containerRef}
          style={{ 
            scale,
            width: "100%",
            height: "100%",
            cursor: scale > 1 ? "grab" : "crosshair"
          }}
          className="relative"
        >
          <div 
            className="w-full h-full relative"
            onClick={handleMapClick}
          >
            <img 
              src="/map.svg" 
              className="w-full h-full block pointer-events-none" 
              draggable={false}
            />

            {/* Pin yang muncul setelah tap */}
            {pinPos && (
              <div
                className="absolute pointer-events-none"
                style={{
                  left: `${pinPos.px}%`,
                  top: `${pinPos.py}%`,
                  transform: `translate(-50%, -100%) scale(${1/scale})`,
                  transformOrigin: "bottom center"
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
        </motion.div>

        {/* Overlay hint kalau belum ada pin */}
        {!pinPos && scale === 1 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-black/30 text-white text-xs font-medium px-3 py-1.5 rounded-full">
              Tap untuk tandai lokasi
            </div>
          </div>
        )}

        {scale > 1 && (
          <div className="absolute bottom-2 right-2 pointer-events-none bg-black/20 rounded-full p-1">
            <Move className="h-4 w-4 text-white opacity-50" />
          </div>
        )}
      </div>

      {/* Status */}
      <div className="w-full px-4 py-2.5 border-t border-gray-100 bg-white">
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