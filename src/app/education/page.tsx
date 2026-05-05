"use client";

import { useState } from "react";
import { MapPin, TrendingUp, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { image } from "framer-motion/m";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import InteractiveMap from "@/components/interactiveMap";

const animals = [
  {
    name: "Orangutan",
    image: "./orangutan.svg",
    status: "Dilindungi",
    population: 500,
  },
  {
    name: "Bekantan",
    image: "./bekantan.svg",
    status: "Dilindungi",
    population: 180,
  },
  {
    name: "Beruang Madu",
    image: "./beruangMadu.svg",
    status: "Dilindungi",
    population: 130,
  },
  {
    name: "Ular",
    image: "./ular.svg",
    status: "Dilindungi",
    population: 90,
  },
  {
    name: "Babi Hutan",
    image: "./babiHutan.svg",
    status: "Dilindungi",
    population: 60,
  },
  {
    name: "Musang",
    image: "./musang.svg",
    status: "Dilindungi",
    population: 30,
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
  { label: "Perkebunan Sawit", value: 300 },
  { label: "Kebun Masyarakat", value: 210 },
  { label: "Hutan", value: 190 },
  { label: "Area Tambang", value: 110 },
  { label: "Pemukiman Warga", value: 50 },
];

const maxLocation = Math.max(...locationData.map((d) => d.value));

const doList = [
  { image: "./berjarak.svg", text: "Jaga jarak aman (10–20 m)" },
  { image: "./suara.svg", text: "Minimalkan kebisingan" },
  { image: "./lapor.svg", text: "Laporkan dan minta bantuan ahli" },
];

const dontList = [
  { image: "./hand.svg", text: "Jangan mendekati atau mengejar" },
  { image: "./makan.svg", text: "Jangan memberi makan / mengganggu" },
  { image: "./listrik.svg", text: "Matikan alat atau sumber listrik di sekitar" },
];

export default function EducationPage() {
  const router = useRouter();
  const [currentAnimal, setCurrentAnimal] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const animal = animals[currentAnimal];

  const prev = () => {
    setExpanded(false);
    setCurrentAnimal((i) => (i - 1 + animals.length) % animals.length);
  };
  const next = () => {
    setExpanded(false);
    setCurrentAnimal((i) => (i + 1) % animals.length);
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
    <div className="min-h-screen bg-primary-200 px-4 py-6 pb-16">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 bg-primary-1000 text-white font-bold px-4 py-2 rounded-xl mb-4"
      >
        <ChevronLeft className="h-5 w-5" />
        Beranda
      </button>
      {/* Header */}
      <div className="mt-14 mb-6">
        <h1 className="text-4xl font-bold text-neutral-1000 mb-1">
          Halo <span className="text-primary-1000">Sahabat Satwa</span> IKN!
        </h1>
        <p className="text-base font-normal text-[#000]">
          Harmoni Pembangunan dan Pelestarian di Jantung Nusantara
        </p>
      </div>

      {/* Peta Interaktif */}
      <div className="flex items-center gap-2 mb-1">
          <img src={"./peta.svg"} className="h-15 w-15" />
          <h2 className="font-bold text-primary-1000 text-2xl">
            Jelajah Habitat: Peta Interaktif Nusantara
          </h2>
        </div>
        <p className="text-base text-[#000] mb-3">
          Kenali tetangga liar di sekitar Anda. Pilih salah satu kartu satwa di bawah untuk mengetahui titik lokasinya di peta!
        </p>
      <div className="bg-white rounded-4xl p-4 mb-4">
          <InteractiveMap currentAnimal={animal.name} />
        </div>

      {/* Animal Carousel */}
      <div className="bg-white rounded-2xl overflow-hidden mb-4">
        <img src={animal.image} alt={animal.name} className="w-full h-48 object-cover" />
        <button
          className="w-full flex items-center justify-between px-4 py-3"
          onClick={() => setExpanded(!expanded)}
        >
          <span className="font-bold text-lg text-neutral-1000">{animal.name}</span>
          {expanded ? <ChevronUp className="h-5 w-5 text-gray-400" /> : <ChevronDown className="h-5 w-5 text-gray-400" />}
        </button>
        {expanded && (
          <div className="px-4 pb-4 space-y-2">
            <div className="flex items-center gap-1 text-sm text-neutral-1000">
              <MapPin className="h-4 w-4" />
              <span>Status: {animal.status}</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-neutral-1000">
              <TrendingUp className="h-4 w-4" />
              <span>Total Populasi: {animal.population}</span>
            </div>
          </div>
        )}
      </div>

      {/* Carousel Controls */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={prev}
          className="flex-1 bg-primary-1000 text-white font-bold py-3 rounded-xl flex items-center justify-center"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={next}
          className="flex-1 bg-primary-1000 text-white font-bold py-3 rounded-xl flex items-center justify-center"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Data dan Jejak Satwa */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-1">
          <img src={"./pie-chart.svg"} className="bg-yellow-100 p-2 rounded-full h-12 w-12" />
          <h2 className="font-bold text-primary-1000 text-2xl">Data dan Jejak Satwa</h2>
        </div>
        <p className="text-base text-[#000] mb-4">
          Pantau situasi terkini agar aktivitasmu tetap aman dan nyaman.
        </p>

        {/* Tren Kasus */}
        <div className="bg-white rounded-2xl p-4 mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-1">Tren Kasus (2021-2025)</h3>
          <p className="text-sm text-neutral-600 mb-4">
            Pantau seberapa sering satwa muncul setiap tahunnya di seluruh wilayah Kalimantan Timur dalam 5 tahun terakhir.
          </p>

          {/* Y axis labels + chart */}
          <div className="flex gap-2 mb-4">
            <div className="flex flex-col justify-between text-xs text-gray-400 text-right pr-1" style={{ height: chartH }}>
              {[300, 250, 200, 150, 100].map((v) => <span key={v}>{v}</span>)}
            </div>
            <div className="flex-1">
              <svg width="100%" viewBox={`0 0 ${chartW} ${chartH}`} preserveAspectRatio="none">
                <defs>
                  <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#283E24" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#283E24" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <polygon
                  points={`0,${chartH} ${polyline} ${chartW},${chartH}`}
                  fill="url(#grad)"
                />
                <polyline
                  points={polyline}
                  fill="none"
                  stroke="#283E24"
                  strokeWidth="2"
                />
                {points.map((p, i) => (
                  <circle key={i} cx={p.x} cy={p.y} r="3" fill="#283E24" />
                ))}
              </svg>
              {/* X labels */}
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                {trendData.map((d) => <span key={d.year}>{d.year}</span>)}
              </div>
            </div>
          </div>

          <div className="flex gap-8">
            <div>
              <p className="text-xs text-gray-400 uppercase">Total Insiden</p>
              <p className="text-2xl font-bold text-primary-1000">935</p>
              <p className="text-xs text-green-600">↗ +12% from last period</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase">Rata-rata Respon</p>
              <p className="text-2xl font-bold text-primary-1000">27 menit</p>
              <p className="text-xs text-green-600">↗ -8% faster</p>
            </div>
          </div>
        </div>

        <p className="text-base text-[#000] mb-3">
          Lalu, di mana saja perjumpaan ini paling sering terjadi? Cek sebaran wilayahnya di bawah ini:
        </p>

        {/* Sebaran Lokasi */}
        <div className="bg-white rounded-2xl p-4">
          <h3 className="text-xl font-bold text-gray-900 mb-1">Sebaran Lokasi</h3>
          <p className="text-sm text-neutral-800 mb-4">
            Titik aktif satwa saat ini. Jika kamu di area dengan grafik tertinggi, <b>tetap siaga dan pahami jalur evakuasi.</b>
          </p>

          <div className="flex items-end gap-2 mb-2" style={{ height: 160 }}>
            {locationData.map((d) => (
              <div key={d.label} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-t-lg bg-primary-1000"
                  style={{ height: `${(d.value / maxLocation) * 140}px` }}
                />
              </div>
            ))}
          </div>
          {/* Y values */}
          <div className="flex gap-2 mb-1">
            {locationData.map((d) => (
              <div key={d.label} className="flex-1 text-center text-xs font-bold text-neutral-1000">{d.value}</div>
            ))}
          </div>
          {/* X labels */}
          <div className="flex gap-2">
            {locationData.map((d) => (
              <div key={d.label} className="flex-1 text-center text-xs font-bold text-neutral-1000 leading-tight">{d.label}</div>
            ))}
          </div>
        </div>
          <p className="text-base text-[#000] font-normal mt-4">
            Jika kamu sering berada di area dengan tingkat aktivitas satwa yang tinggi, <b>pastikan untuk tetap siaga dan memahami jalur evakuasi.</b>
          </p>
      </div>

      {/* Edukasi Panduan Keselamatan */}
      <div className="flex items-center gap-2 mb-1">
        <img src={"./info.svg"} className="bg-yellow-100 p-2 rounded-full h-13 w-13"/>
        <h2 className="font-bold text-primary-1000 text-2xl">Edukasi Panduan Keselamatan</h2>
      </div>
      <div>
        <p className="text-base text-[#000] mb-4">
          Pahami langkah penanganan pertama ini. Tindakan yang tepat dapat mencegah terjadinya konflik dan menjaga situasi tetap terkendali.
        </p>

        {/* DO */}
        <div className="flex items-center gap-2 mb-2 border-b border-primary-1000 pb-2">
          <img src={"./do.svg"} className="w-8 h-8" />
          <span className="font-bold text-2xl text-primary-1000">DO</span>
        </div>
        <div className="space-y-2 mb-6">
          {doList.map((item) => (
            <div key={item.text} className="flex items-center gap-3 bg-primary-100 rounded-xl p-3">
              <div className="bg-primary-1000 rounded-xl p-2 w-10 h-10 flex items-center justify-center">
                <img src={item.image} className="w-6 h-6" />
              </div>
              <span className="text-sm text-gray-700">{item.text}</span>
            </div>
          ))}
        </div>
        {/* DON'T */}
        <div className="flex items-center gap-2 mb-2 border-b border-red-200 pb-2">
          <img src={"./dont.svg"} className="w-8 h-8" />
          <span className="font-bold text-2xl text-red-300">DON'T</span>
        </div>
        <div className="space-y-2">
          {dontList.map((item) => (
            <div key={item.text} className="flex items-center gap-3 bg-red-50 rounded-xl p-3">
              <div className="bg-red-100 rounded-xl p-2 w-10 h-10 flex items-center justify-center">
                <img src={item.image} className="w-6 h-6" />
              </div>
              <span className="text-lg text-neutral-1000 font-medium">{item.text}</span>
            </div>
          ))}   
        </div>
      </div>
    </div>
    </>
  );
}