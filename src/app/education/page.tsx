"use client";

import { useState } from "react";
import { MapPin, TrendingUp, ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from "lucide-react";
import { useRouter } from "next/navigation";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import InteractiveMap from "@/components/interactiveMap";

const animals = [
  {
    name: "Orangutan",
    image: "/orangutan.svg",
    status: "Dilindungi (Kritis)",
    population: 500,
    habitat: "Hutan Hujan Tropis",
    food: "Buah-buahan, Daun",
  },
  {
    name: "Bekantan",
    image: "/bekantan.svg",
    status: "Dilindungi (Terancam)",
    population: 180,
    habitat: "Hutan Mangrove",
    food: "Pucuk Daun, Buah",
  },
  {
    name: "Beruang Madu",
    image: "/beruangMadu.svg",
    status: "Dilindungi (Rentan)",
    population: 130,
    habitat: "Hutan Tropis",
    food: "Madu, Serangga",
  },
  {
    name: "Ular",
    image: "/ular.svg",
    status: "Stabil",
    population: 90,
    habitat: "Beragam",
    food: "Hewan Kecil",
  },
  {
    name: "Babi Hutan",
    image: "/babiHutan.svg",
    status: "Rentan",
    population: 60,
    habitat: "Hutan Hujan",
    food: "Umbi-umbian, Buah",
  },
  {
    name: "Musang",
    image: "/musang.svg",
    status: "Risiko Rendah",
    population: 30,
    habitat: "Hutan Sekunder",
    food: "Buah, Hewan Kecil",
  },
];

const trendData = [
  { year: "2021", value: 80 },
  { year: "2022", value: 160 },
  { year: "2023", value: 180 },
  { year: "2024", value: 210 },
  { year: "2025", value: 290 },
];

const locationData = [
  { label: "Kebun Sawit", value: 300 },
  { label: "Masyarakat", value: 210 },
  { label: "Hutan", value: 190 },
  { label: "Tambang", value: 110 },
  { label: "Pemukiman", value: 50 },
];

const maxLocation = Math.max(...locationData.map((d) => d.value));

const doList = [
  { image: "/berjarak.svg", text: "Jaga jarak aman (10–20 m)" },
  { image: "/suara.svg", text: "Minimalkan kebisingan" },
  { image: "/lapor.svg", text: "Laporkan dan minta bantuan ahli" },
];

const dontList = [
  { image: "/hand.svg", text: "Jangan mendekati atau mengejar" },
  { image: "/makan.svg", text: "Jangan memberi makan / mengganggu" },
  { image: "/listrik.svg", text: "Matikan alat atau sumber listrik di sekitar" },
];

export default function EducationPage() {
  const router = useRouter();
  const [currentAnimalIdx, setCurrentAnimalIdx] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const animal = animals[currentAnimalIdx];

  const prev = () => {
    setExpanded(false);
    setCurrentAnimalIdx((i) => (i - 1 + animals.length) % animals.length);
  };
  const next = () => {
    setExpanded(false);
    setCurrentAnimalIdx((i) => (i + 1) % animals.length);
  };

  // Line chart points
  const maxVal = Math.max(...trendData.map((d) => d.value));
  const chartW = 280;
  const chartH = 120;
  const points = trendData.map((d, i) => ({
    x: (i / (trendData.length - 1)) * chartW,
    y: chartH - (d.value / maxVal) * chartH,
  }));
  const polyline = points.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <>
      <WhatsAppButton />
      <div className="min-h-screen bg-primary-200 px-4 py-6 pb-24">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 bg-primary-1000 text-white font-bold px-4 py-2 rounded-xl mb-4 shadow-sm"
        >
          <ChevronLeft className="h-5 w-5" />
          Beranda
        </button>

        {/* Header */}
        <div className="mt-10 mb-8">
          <h1 className="text-4xl font-black text-neutral-1000 mb-2 leading-none">
            Halo <span className="text-primary-1000">Sahabat Satwa</span> IKN!
          </h1>
          <p className="text-base font-medium text-gray-600">
            Harmoni Pembangunan dan Pelestarian di Jantung Nusantara
          </p>
        </div>

        {/* Peta Interaktif */}
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-white p-2 rounded-2xl shadow-sm">
            <img src="/peta.svg" className="h-10 w-10" alt="peta" />
          </div>
          <h2 className="font-black text-primary-1000 text-2xl tracking-tighter">
            JELAJAH HABITAT
          </h2>
        </div>
        
        {/* Full width map card */}
        <div className="bg-white rounded-3xl mb-8 shadow-md border border-white p-2">
          <InteractiveMap currentAnimal={animal.name} />
        </div>

        {/* Animal Detail Card */}
        <div className="bg-white rounded-3xl overflow-hidden mb-6 shadow-md border border-white">
          <div className="h-56 bg-primary-50 flex items-center justify-center relative overflow-hidden">
             <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary-1000 to-transparent"></div>
             <img src={animal.image} alt={animal.name} className="h-48 w-48 object-contain drop-shadow-2xl z-10 scale-110" />
          </div>
          <button
            className="w-full flex items-center justify-between px-6 py-5 bg-white group"
            onClick={() => setExpanded(!expanded)}
          >
            <div className="text-left">
              <p className="text-[10px] font-black text-primary-600 uppercase tracking-[0.2em] mb-1">DATA SATWA</p>
              <h3 className="font-black text-3xl text-neutral-1000 tracking-tighter">{animal.name}</h3>
            </div>
            <div className="bg-primary-100 p-2 rounded-full group-hover:bg-primary-200 transition-colors">
              {expanded ? <ChevronUp className="h-6 w-6 text-primary-1000" /> : <ChevronDown className="h-6 w-6 text-primary-1000" />}
            </div>
          </button>
          
          {expanded && (
            <div className="px-6 pb-6 space-y-4 border-t border-gray-50 pt-6 animate-in slide-in-from-top-4 duration-300">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Status</p>
                  <p className="text-sm font-black text-gray-700">{animal.status}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Populasi</p>
                  <p className="text-sm font-black text-gray-700">~{animal.population} Ekor</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Habitat</p>
                  <p className="text-sm font-black text-gray-700">{animal.habitat}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Makanan</p>
                  <p className="text-sm font-black text-gray-700">{animal.food}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Carousel Nav */}
        <div className="flex gap-4 mb-12">
          <button
            onClick={prev}
            className="flex-1 bg-white text-primary-1000 border-2 border-primary-100 font-black py-4 rounded-2xl flex items-center justify-center shadow-sm active:scale-95 transition-all"
          >
            <ChevronLeft className="h-7 w-7" />
          </button>
          <button
            onClick={next}
            className="flex-1 bg-primary-1000 text-white font-black py-4 rounded-2xl flex items-center justify-center shadow-xl shadow-primary-200 active:scale-95 transition-all"
          >
            <ChevronRight className="h-7 w-7" />
          </button>
        </div>

        {/* Stats Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="bg-white p-2 rounded-2xl shadow-sm">
               <img src="/pie-chart.svg" className="h-8 w-8" alt="chart" />
            </div>
            <h2 className="font-black text-primary-1000 text-2xl tracking-tighter uppercase">DATA & JEJAK</h2>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-md border border-white">
            <h3 className="text-xl font-black text-gray-900 mb-1 tracking-tight">TREN KEMUNCULAN</h3>
            <p className="text-[10px] font-bold text-neutral-400 mb-8 uppercase tracking-widest">Wilayah Kalimantan Timur (2021-2025)</p>

            <div className="relative mb-8">
              <svg width="100%" height={chartH} viewBox={`0 0 ${chartW} ${chartH}`} preserveAspectRatio="none">
                <defs>
                  <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#283E24" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#283E24" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <polygon points={`0,${chartH} ${polyline} ${chartW},${chartH}`} fill="url(#grad)" />
                <polyline points={polyline} fill="none" stroke="#283E24" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                {points.map((p, i) => (
                  <circle key={i} cx={p.x} cy={p.y} r="5" fill="white" stroke="#283E24" strokeWidth="3" />
                ))}
              </svg>
              <div className="flex justify-between text-[10px] font-black text-gray-400 mt-4 px-1">
                {trendData.map((d) => <span key={d.year}>{d.year}</span>)}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 border-t border-gray-50 pt-6">
              <div>
                <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest mb-1">TOTAL INSIDEN</p>
                <p className="text-3xl font-black text-primary-1000 leading-none">935</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest mb-1">RESPON CEPAT</p>
                <p className="text-3xl font-black text-primary-1000 leading-none">27<span className="text-sm">m</span></p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-md border border-white">
            <h3 className="text-xl font-black text-gray-900 mb-8 tracking-tight uppercase">LOKASI TERPADAT</h3>
            <div className="flex items-end gap-3 mb-6" style={{ height: 160 }}>
              {locationData.map((d) => (
                <div key={d.label} className="flex-1 flex flex-col items-center gap-2">
                  <div
                    className="w-full rounded-t-xl bg-primary-1000 shadow-sm"
                    style={{ height: `${(d.value / maxLocation) * 130}px` }}
                  />
                  <span className="text-[9px] font-black text-neutral-1000 uppercase rotate-[-45deg] origin-right mt-3 h-10 whitespace-nowrap">{d.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Safety Guide */}
        <div className="mt-16 space-y-8">
          <div className="flex items-center gap-3">
             <div className="bg-white p-2 rounded-2xl shadow-sm">
               <img src="/info.svg" className="h-8 w-8" alt="info" />
            </div>
            <h2 className="font-black text-primary-1000 text-2xl tracking-tighter uppercase">PANDUAN AMAN</h2>
          </div>

          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-4 border-b-4 border-primary-1000/20 pb-3">
                <img src="/do.svg" className="w-7 h-7" alt="do" />
                <span className="font-black text-2xl text-primary-1000 tracking-tighter">LAKUKAN</span>
              </div>
              <div className="grid gap-3">
                {doList.map((item) => (
                  <div key={item.text} className="flex items-center gap-4 bg-white rounded-2xl p-5 shadow-sm border border-gray-50">
                    <div className="bg-primary-100 rounded-2xl p-2.5 h-12 w-12 flex items-center justify-center flex-shrink-0">
                      <img src={item.image} className="w-7 h-7" alt="icon" />
                    </div>
                    <span className="text-sm font-bold text-gray-700 leading-tight">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-4 border-b-4 border-red-100 pb-3">
                <img src="/dont.svg" className="w-7 h-7" alt="dont" />
                <span className="font-black text-2xl text-red-500 tracking-tighter uppercase">HINDARI</span>
              </div>
              <div className="grid gap-3">
                {dontList.map((item) => (
                  <div key={item.text} className="flex items-center gap-4 bg-white rounded-2xl p-5 shadow-sm border border-gray-50">
                    <div className="bg-red-50 rounded-2xl p-2.5 h-12 w-12 flex items-center justify-center flex-shrink-0">
                      <img src={item.image} className="w-7 h-7" alt="icon" />
                    </div>
                    <span className="text-sm font-bold text-gray-700 leading-tight">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
