"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Camera, MapPin, Loader2, CheckCircle } from "lucide-react";

export default function ReportForm() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    animalType: "",
    description: "",
    latitude: 0,
    longitude: 0,
    address: "Fetching location...",
    imageUrl: "",
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Get current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData((prev) => ({
            ...prev,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            address: `IKN Area - Lat: ${position.coords.latitude.toFixed(4)}, Lng: ${position.coords.longitude.toFixed(4)}`,
          }));
        },
        () => {
          setFormData((prev) => ({ ...prev, address: "Location access denied" }));
        }
      );
    }
  }, []);

  const [uploading, setUploading] = useState(false);

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

    setIsLoading(true);
    try {
      const res = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          reporterId: user.id,
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
      <div className="flex h-[calc(100vh-64px)] flex-col items-center justify-center p-4 text-center">
        <div className="mb-6 rounded-full bg-emerald-100 p-6 text-emerald-600">
          <CheckCircle className="h-16 w-16" />
        </div>
        <h1 className="mb-2 text-2xl font-bold">Report Submitted!</h1>
        <p className="text-slate-500">The Forest Rangers have been notified.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-lg px-4 py-8">
      <button
        onClick={() => router.back()}
        className="mb-6 flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-forest-green"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Dashboard
      </button>

      <h1 className="mb-8 text-3xl font-bold text-slate-900">New Report</h1>

      <form onSubmit={handleSubmit} className="space-y-6 pb-20">
        {/* Animal Type */}
        <div>
          <label className="mb-2 block text-sm font-bold text-slate-700">Animal Type</label>
          <select
            required
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-forest-green focus:bg-white"
            value={formData.animalType}
            onChange={(e) => setFormData({ ...formData, animalType: e.target.value })}
          >
            <option value="">Select animal type</option>
            <option value="Sun Bear">Sun Bear (Beruang Madu)</option>
            <option value="Orangutan">Orangutan</option>
            <option value="Proboscis Monkey">Proboscis Monkey (Bekantan)</option>
            <option value="Snake">Snake (Ular)</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Photo Upload */}
        <div>
          <label className="mb-2 block text-sm font-bold text-slate-700">Photo</label>
          <label className="relative flex h-40 w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 text-slate-400 transition-colors hover:border-forest-green hover:bg-forest-green/5">
            {uploading ? (
              <Loader2 className="h-10 w-10 animate-spin text-forest-green" />
            ) : formData.imageUrl ? (
              <img src={formData.imageUrl} alt="Preview" className="h-full w-full rounded-2xl object-cover" />
            ) : (
              <>
                <Camera className="h-10 w-10" />
                <span className="text-sm font-medium">Click to Upload Photo</span>
              </>
            )}
            <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} disabled={uploading} />
          </label>
        </div>

        {/* Description */}
        <div>
          <label className="mb-2 block text-sm font-bold text-slate-700">Description</label>
          <textarea
            required
            rows={4}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-forest-green focus:bg-white"
            placeholder="What happened? Where exactly?"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>

        {/* Location Display */}
        <div className="rounded-2xl bg-slate-100 p-4">
          <div className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-700">
            <MapPin className="h-4 w-4" />
            Location Tagged
          </div>
          <p className="text-sm text-slate-500">{formData.address}</p>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="flex w-full items-center justify-center rounded-2xl bg-forest-green py-4 text-lg font-extrabold text-white transition-all hover:bg-forest-green/90 disabled:opacity-70 shadow-lg shadow-forest-green/20"
        >
          {isLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : "SUBMIT REPORT"}
        </button>
      </form>
    </div>
  );
}
