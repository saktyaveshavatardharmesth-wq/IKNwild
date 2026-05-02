"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, Loader2 } from "lucide-react";

export default function LoginPage() {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      const data = await res.json();

      if (res.ok) {
        // Store user info in localStorage for this prototype
        localStorage.setItem("user", JSON.stringify(data));
        
        if (data.role === "FOREST_RANGER") {
          router.push("/ranger");
        } else {
          router.push("/worker");
        }
      } else {
        setError(data.error || "Invalid login code");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto flex min-h-[calc(100vh-64px)] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border bg-white p-8 shadow-xl">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-forest-green">
            <Shield className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">IKNwild Staff Portal</h1>
          <p className="text-slate-500">Enter your access code to sign in</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="code" className="mb-2 block text-sm font-semibold text-slate-700">
              Access Code
            </label>
            <input
              id="code"
              type="text"
              required
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition-all focus:border-forest-green focus:bg-white focus:ring-4 focus:ring-forest-green/10"
              placeholder="e.g. RANGER123"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>

          {error && (
            <div className="rounded-lg bg-red-50 p-3 text-sm font-medium text-red-600">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full items-center justify-center rounded-xl bg-forest-green py-3.5 text-lg font-bold text-white transition-all hover:bg-forest-green/90 disabled:opacity-70"
          >
            {isLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : "Sign In"}
          </button>
        </form>

        <p className="mt-8 text-center text-xs text-slate-400">
          Access codes are provided by the IKN Security Department. 
          Session remains active for 24 hours.
        </p>
      </div>
    </div>
  );
}
