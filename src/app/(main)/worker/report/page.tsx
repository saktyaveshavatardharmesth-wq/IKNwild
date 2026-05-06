"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Camera, MapPin, Loader2, CheckCircle } from "lucide-react";
import MapPicker from "@/components/mapPicker";

const ANIMAL_OPTIONS = [
  { value: "Orangutan", label: "Orangutan", image: "/orangutan_icon.webp" },
  { value: "Sun Bear", label: "Beruang Madu", image: "/beruangMadu_icon.webp" },
  { value: "Proboscis Monkey", label: "Bekantan", image: "/bekantan_icon.webp" },
  { value: "Babirusa", label: "Babi Hutan", image: "/babiHutan_icon.webp" },
  { value: "Musang", label: "Musang", image: "/musang_icon.webp" },
  { value: "Snake", label: "Ular", image: "/ular_icon.webp" },
];

export default function ReportForm() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [mapLocation, setMapLocation] = useState<{ px: number; py: number; label: string } | null>(null);

  const [formData, setFormData] = useState({
    animalType: "",
    description: "",
    latitude: 0,
    longitude: 0,
    address: "",
    imageUrl: "",
    notes: "",
    reporterName: "",
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser(parsed);
      setFormData((prev) => ({ ...prev, reporterName: parsed.name }));
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData((prev) => ({
            ...prev,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            address: prev.address || `IKN Area - Lat: ${position.coords.latitude.toFixed(4)}, Lng: ${position.coords.longitude.toFixed(4)}`,
          }));
        },
        () => {
          console.log("Geolocation access denied");
        }
      );
    }
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formDataUpload = new FormData();
    formDataUpload.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formDataUpload,
      });
      const data = await res.json();
      if (data.url) {
        setFormData((prev) => ({ ...prev, imageUrl: data.url }));
      }
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (!formData.description.trim()) {
      alert("Mohon isi deskripsi temuan.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          description: formData.description.trim(),
          reporterId: user.id,
          mapX: mapLocation?.px,
          mapY: mapLocation?.py,
        }),
      });

      if (res.ok) {
        setIsSuccess(true);
        setTimeout(() => router.push("/worker"), 2000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center bg-[#E8F0E5]">
        <div className="mb-6 rounded-full bg-green-100 p-6 text-green-600">
          <CheckCircle className="h-16 w-16" />
        </div>
        <h1 className="mb-2 text-2xl font-bold text-primary-1000">Laporan Terkirim!</h1>
        <p className="text-gray-500">Polisi hutan telah diberitahu.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#E8F0E5] px-4 py-6 pb-24">

      <h1 className="text-3xl font-bold text-primary-1000 mb-6">
        Isi Detail Laporan!
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Nama Pelapor */}
        <div className="bg-white rounded-2xl p-4">
          <label className="block text-lg text-neutral-1000 font-bold mb-1">Nama Pelapor</label>
          <input
            type="text"
            className="w-full outline-none text-gray-900 placeholder:text-gray-300"
            placeholder="e.g. Helena Koronka"
            value={formData.reporterName}
            onChange={(e) => setFormData({ ...formData, reporterName: e.target.value })}
          />
        </div>

        {/* Deskripsi */}
        <div className="bg-white rounded-2xl p-4">
          <label className="block text-lg text-neutral-1000 font-bold mb-1">Deskripsi Temuan</label>
          <textarea
            required
            className="w-full outline-none text-gray-900 placeholder:text-gray-300 resize-none"
            rows={3}
            placeholder="e.g. Hewan masuk ke dalam alat berat"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>

        {/* Jenis Satwa */}
        <div className="bg-white rounded-2xl p-4">
          <label className="block text-lg text-neutral-1000 font-bold mb-3">Jenis Satwa</label>
          <div className="grid grid-cols-3 gap-2">
            {ANIMAL_OPTIONS.map((animal) => (
              <button
                key={animal.value}
                type="button"
                onClick={() => setFormData({ ...formData, animalType: animal.value })}
                className={`flex flex-col items-center justify-center gap-1 rounded-xl border-2 p-3 transition-all ${
                  formData.animalType === animal.value
                    ? "border-primary-1000 bg-primary-300"
                    : "border-gray-100 bg-primary-100"
                }`}
              >
                <img className="text-2xl" src={animal.image} />
                <span className="text-sm font-bold text-neutral-1000">{animal.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Lokasi */}
        <div className="bg-white rounded-2xl p-4">
          <label className="block text-lg text-neutral-1000 font-bold mb-3">
            Tandai Lokasi di Peta
          </label>
          <div className="rounded-xl overflow-hidden mb-2">
            <MapPicker
              onLocationSelect={(loc) => setMapLocation(loc)}
              selectedPx={mapLocation?.px}
              selectedPy={mapLocation?.py}
            />
          </div>

          <div className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-neutral-1000 mb-1">Latitude</label>
                <input
                  type="number"
                  step="any"
                  className="w-full bg-gray-50 rounded-xl p-3 outline-none text-gray-900 border border-gray-100"
                  placeholder="-0.9123"
                  value={formData.latitude}
                  onChange={(e) => setFormData({ ...formData, latitude: parseFloat(e.target.value) || 0 })}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-neutral-1000 mb-1">Longitude</label>
                <input
                  type="number"
                  step="any"
                  className="w-full bg-gray-50 rounded-xl p-3 outline-none text-gray-900 border border-gray-100"
                  placeholder="116.7891"
                  value={formData.longitude}
                  onChange={(e) => setFormData({ ...formData, longitude: parseFloat(e.target.value) || 0 })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-neutral-1000 mb-1">Alamat / Detail Lokasi</label>
              <textarea
                rows={2}
                required
                className="w-full bg-gray-50 rounded-xl p-3 outline-none text-gray-900 border border-gray-100 resize-none"
                placeholder="e.g. Dekat mess pekerja zone A"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* Upload Foto */}
        <div className="bg-white rounded-2xl p-4">
          <label className="block text-lg text-neutral-1000 font-bold mb-1">Upload Foto</label>
          <p className="text-sm text-neutral-1000 mb-3">Format: JPG atau PNG dengan kualitas tinggi</p>
          <label className="flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 h-50 cursor-pointer">
            {uploading ? (
              <Loader2 className="h-8 w-8 animate-spin text-primary-1000" />
            ) : formData.imageUrl ? (
              <img src={formData.imageUrl} alt="Preview" className="h-full w-full rounded-2xl object-cover" />
            ) : (
              <>
                <Camera className="h-8 w-8 text-gray-400" />
                <span className="text-sm text-gray-400">Tap to take or upload photo</span>
                <span className="text-xs text-gray-400">High resolution JPG or PNG</span>
              </>
            )}
            <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} disabled={uploading} />
          </label>
        </div>

        {/* Catatan Tambahan */}
        <div className="bg-white rounded-2xl p-4">
          <label className="block text-lg text-neutral-1000 font-bold mb-1">
            Catatan Tambahan (Opsional)
          </label>
          <textarea
            rows={3}
            className="w-full outline-none text-gray-900 placeholder:text-gray-300 resize-none"
            placeholder="e.g. Satwa terlihat masuk ke area slot berat dan tidak agresif"
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading || !formData.animalType}
          className="w-full bg-primary-1000 text-white font-bold py-4 rounded-2xl text-lg disabled:opacity-70"
        >
          {isLoading ? <Loader2 className="h-6 w-6 animate-spin mx-auto" /> : "Kirim Laporan"}
        </button>

      </form>
    </div>
  );
}