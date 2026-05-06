"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ZoomIn, ZoomOut, Move } from "lucide-react";

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

export default function ForestMap({ reports, onSelectReport }: Props) {
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const pending = reports.filter(r => r.status === "PENDING");

  const zoomIn = () => setScale(prev => Math.min(prev + 0.5, 4));
  const zoomOut = () => setScale(prev => Math.max(prev - 0.5, 1));
  const resetZoom = () => setScale(1);

  return (
    <div className="bg-white rounded-2xl shadow-inner border border-gray-100 flex flex-col items-center h-full overflow-hidden relative">
      {/* Controls Overlay */}
      <div className="absolute top-2 right-2 z-10 flex flex-col gap-1">
        <button 
          onClick={zoomIn}
          className="p-1.5 bg-white/80 backdrop-blur shadow-sm rounded-lg hover:bg-white transition-colors border border-gray-100"
        >
          <ZoomIn className="h-4 w-4 text-gray-600" />
        </button>
        <button 
          onClick={zoomOut}
          className="p-1.5 bg-white/80 backdrop-blur shadow-sm rounded-lg hover:bg-white transition-colors border border-gray-100"
        >
          <ZoomOut className="h-4 w-4 text-gray-600" />
        </button>
        <button 
          onClick={resetZoom}
          className="p-1.5 bg-white/80 backdrop-blur shadow-sm rounded-lg hover:bg-white transition-colors border border-gray-100"
        >
          <span className="text-[8px] font-black text-gray-600 px-0.5">1:1</span>
        </button>
      </div>

      {/* MAP AREA */}
      <div
        ref={containerRef}
        className="relative w-full h-full bg-slate-50 overflow-hidden"
      >
        <motion.div
          drag
          dragConstraints={containerRef}
          style={{ 
            scale,
            width: "100%",
            height: "100%",
            cursor: scale > 1 ? "grab" : "default"
          }}
          className="relative"
        >
          <img 
            src="/map.svg" 
            className="w-full h-full block pointer-events-none" 
            alt="IKN Map" 
            draggable={false}
          />

          {/* PINS */}
          {pending.map((report) => {
            if (report.px === undefined || report.py === undefined || report.px === null || report.py === null) return null;

            const px = report.px;
            const py = report.py;

            return (
              <div
                key={report.id}
                className="absolute"
                style={{
                  left: `${px}%`,
                  top: `${py}%`,
                  transform: `translate(-50%, -100%) scale(${1/scale})`,
                  transformOrigin: "bottom center",
                  zIndex: 5,
                }}
                onClick={e => {
                  e.stopPropagation();
                  onSelectReport(report);
                }}
              >
                {/* Pin */}
                <div className="transition-all duration-300 hover:scale-125 origin-bottom cursor-pointer drop-shadow-lg">
                  <svg width="32" height="40" viewBox="0 0 32 40" fill="none">
                    <path d="M16 0C7.163 0 0 7.163 0 16c0 11.25 16 24 16 24s16-12.75 16-24c0-8.837-7.163-16-16-16z" fill="#EF4444"/>
                    <circle cx="16" cy="16" r="6" fill="white"/>
                  </svg>
                </div>
              </div>
            );
          })}
        </motion.div>

        {scale > 1 && (
          <div className="absolute bottom-2 left-2 pointer-events-none bg-black/20 rounded-full p-1 z-10">
            <Move className="h-4 w-4 text-white opacity-50" />
          </div>
        )}
      </div>

      <div className="w-full px-4 py-3 flex items-center gap-2 bg-gray-50 border-t border-gray-100 z-10">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Laporan Belum Ditangani</span>
      </div>
    </div>
  );
}
