"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trees, Loader2 } from "lucide-react";
import { code, data, div } from "framer-motion/m";

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
    <>
        <div
        className="absolute inset-0 -z-[5] opacity-60"
        style={{
            background: "linear-gradient(180deg, var(--Colors-Primary-100, #E4EEE2) 40%, var(--Colors-Primary-300, #AECDA8) 100%)"
        }}
        />
        <div className="flex flex-col gap-2 justify-center items-center min-h-screen px-4">
            <div className="mb-8 text-center">
                <div style={{ filter: "drop-shadow(0 4px 5px rgba(0, 0, 0, 0.40))" }} className="mx-auto mb-4 flex h-[80px] w-[80px] items-center justify-center rounded-full bg-primary-1000 border-[#C2C9BB] border-solid border drop-shadow-xl">
                    <Trees className="h-10 w-10 text-white" />
                </div>
                <h1 className="text-4xl font-bold text-primary-1000">
                    Hello, Polhut!
                </h1>
                <p className="text-[#000] text-base font-normal text-center w-[300px] md:w-[500px]">
                    Masuk menggunakan kode akses yang diberikan oleh perusahaan untuk melanjutkan.
                </p>
            </div>
            <div className="container mx-auto flex items-center justify-center px-4">
                <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label htmlFor="code" className="mb-2 block text-sm font-semibold text-slate-700">
                                Access Code
                            </label>
                            <input
                                id="code"
                                type="text"
                                required
                                className="w-full rounded-xl border border-neutral-500 px-4 py-3 outline-none transition-all bg-[#F9FAF2] focus:border-forest-green focus:bg-[#F9FAF2] focus:ring-4 focus:ring-forest-green/10"
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
                            {isLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : "Masuk"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </>
    );
}
