"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ZoomIn, ZoomOut, Move } from "lucide-react";

// Data lokasi pinpoint per hewan (px, py dalam % terhadap area peta)
const animalHotspots: Record<string, { px: number; py: number; label: string }[]> = {
  Orangutan: [
    { px: 25, py: 75, label: "Hutan Lindung Barat" },
    { px: 40, py: 65, label: "Area Konservasi Tengah" },
    { px: 75, py: 35, label: "Hutan Utara" },
    { px: 35, py: 50, label: "Zona Rehabilitasi A" },
    { px: 55, py: 45, label: "Bukit Orangutan" },
    { px: 65, py: 78, label: "Lembah Primata" },
  ],
  Bekantan: [
    { px: 85, py: 45, label: "Mangrove Timur" },
    { px: 80, py: 30, label: "Pesisir Utara" },
    { px: 90, py: 65, label: "Delta Sungai IKN" },
    { px: 70, py: 20, label: "Hutan Bakau Utara" },
    { px: 92, py: 50, label: "Konservasi Mangrove B" },
  ],
  "Beruang Madu": [
    { px: 35, py: 68, label: "Lembah Beruang" },
    { px: 60, py: 55, label: "Hutan Primer" },
    { px: 25, py: 45, label: "Lereng Bukit Barat" },
    { px: 50, py: 35, label: "Zona Hijau Utama" },
    { px: 45, py: 82, label: "Kawasan Madu Alam" },
  ],
  Ular: [
    { px: 50, py: 82, label: "Area Rawa Selatan" },
    { px: 20, py: 78, label: "Semak Belukar Barat" },
    { px: 85, py: 25, label: "Hutan Utara" },
    { px: 15, py: 45, label: "Pinggiran Sungai" },
    { px: 70, py: 88, label: "Zona Hutan Lebat" },
  ],
  "Babi Hutan": [
    { px: 45, py: 58, label: "Pinggir Hutan" },
    { px: 35, py: 88, label: "Perkebunan Warga" },
    { px: 65, py: 92, label: "Area Terbuka Selatan" },
    { px: 20, py: 65, label: "Hutan Sekunder" },
    { px: 82, py: 75, label: "Zona Cari Makan C" },
  ],
  Musang: [
    { px: 25, py: 82, label: "Pemukiman Barat" },
    { px: 75, py: 48, label: "Kebun Warga" },
    { px: 55, py: 15, label: "Hutan Belukar Utara" },
    { px: 92, py: 82, label: "Area Kebun Timur" },
    { px: 15, py: 25, label: "Zona Perbatasan" },
  ],
};

interface Props {
  currentAnimal: string;
}

export default function InteractiveMap({ currentAnimal }: Props) {
  const [hoveredPin, setHoveredPin] = useState<string | null>(null);
  const [selectedPin, setSelectedPin] = useState<{ px: number; py: number; label: string } | null>(null);
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const hotspots = animalHotspots[currentAnimal] || [];

  const zoomIn = () => setScale(prev => Math.min(prev + 0.5, 4));
  const zoomOut = () => setScale(prev => Math.max(prev - 0.5, 1));
  const resetZoom = () => setScale(1);

  return (
    <div className="w-full flex flex-col items-center">
      {/* Tooltip Overlay */}
      <div className="w-full flex justify-between items-center mb-4 px-2">
        <h5 className="font-black text-gray-900 uppercase tracking-tighter text-sm">
          Lokasi Temuan: {currentAnimal}
        </h5>
        {hoveredPin && (
          <div className="bg-red-600 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg">
            {hoveredPin}
          </div>
        )}
      </div>

      {/* MAP CONTAINER */}
      <div 
        ref={containerRef}
        className="relative w-full max-w-[450px] bg-slate-50 rounded-2xl overflow-hidden border border-gray-100" 
        style={{ aspectRatio: "390 / 398" }}
      >
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
          {/* Original Map as Image */}
          <img 
            src="/map.svg" 
            className="w-full h-full block pointer-events-none" 
            alt="IKN Map"
            draggable={false}
          />

          {/* PINPOINTS OVERLAY */}
          {hotspots.map((pin, idx) => (
            <div
              key={`${currentAnimal}-${idx}`}
              className="absolute group"
              style={{
                left: `${pin.px}%`,
                top: `${pin.py}%`,
                transform: `translate(-50%, -50%) scale(${1/scale})`,
              }}
              onMouseEnter={() => setHoveredPin(pin.label)}
              onMouseLeave={() => setHoveredPin(null)}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedPin(pin);
              }}
            >
              {/* Red Dot with White Border */}
              <div className="relative cursor-pointer transition-transform duration-200 group-hover:scale-150">
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-red-500/30 rounded-full animate-ping"></div>
                 <div className="w-3 h-3 bg-red-600 border-2 border-white rounded-full shadow-md"></div>
              </div>
            </div>
          ))}
        </motion.div>

        {scale > 1 && (
          <div className="absolute bottom-2 left-2 pointer-events-none bg-black/20 rounded-full p-1 z-10">
            <Move className="h-4 w-4 text-white opacity-50" />
          </div>
        )}
      </div>

      {/* Modal Detail (Centered) */}
      {selectedPin && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setSelectedPin(null)}
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl relative"
            onClick={e => e.stopPropagation()}
          >
            <button 
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
              onClick={() => setSelectedPin(null)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-3xl">🐾</span>
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-2 uppercase tracking-tight">
                {currentAnimal}
              </h3>
              <p className="text-gray-500 font-medium mb-6">
                Terdeteksi di area: <br />
                <span className="text-primary-1000 font-bold">{selectedPin.label}</span>
              </p>
              <div className="w-full grid grid-cols-2 gap-3 text-xs font-bold uppercase tracking-widest">
                <div className="bg-gray-50 p-3 rounded-2xl border border-gray-100">
                  <p className="text-gray-400 mb-1">X-POS</p>
                  <p className="text-gray-900">{Math.round(selectedPin.px)}%</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-2xl border border-gray-100">
                  <p className="text-gray-400 mb-1">Y-POS</p>
                  <p className="text-gray-900">{Math.round(selectedPin.py)}%</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedPin(null)}
                className="mt-8 w-full bg-primary-1000 text-white font-bold py-4 rounded-2xl shadow-lg active:scale-95 transition-transform"
              >
                TUTUP
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <div className="mt-6 flex items-center gap-2 opacity-60">
        <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
        <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Titik Aktivitas Terkini</span>
      </div>
    </div>
  );
}
