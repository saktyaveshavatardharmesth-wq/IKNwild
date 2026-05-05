"use client";
import Link from "next/link";
import { Menu, X, HelpCircle, BookOpen, Home } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <img src="/icon.webp" className="h-8 w-10" />
            <span className="text-xl font-bold tracking-tight text-primary-1000">
              IKN<span className="text-primary-700">wild</span>
            </span>
          </Link>
          <button
            className="rounded-full p-2 hover:bg-slate-100"
            onClick={() => setIsOpen(true)}
          >
            <Menu className="h-6 w-6 text-slate-600" />
          </button>
        </div>
      </nav>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/20"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Menu Panel */}
      <div className={`fixed top-0 left-0 z-50 h-1/4 md:h-2/5 w-full bg-white transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center justify-between px-4 py-4">
          <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
            <img src="/icon.webp" className="h-8 w-10" />
            <span className="text-xl font-bold tracking-tight text-primary-1000">
              IKN<span className="text-primary-700">wild</span>
            </span>
          </Link>
          <button onClick={() => setIsOpen(false)}>
            <X className="h-6 w-6 text-slate-600" />
          </button>
        </div>

        <div className="flex flex-col px-4 py-6 gap-6">
          <Link
            href="https://wa.me/1234567890"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 text-lg text-gray-700"
          >
            <HelpCircle className="h-6 w-6" />
            Pusat Bantuan
          </Link>
          <Link
            href="/education"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 text-lg text-gray-700"
          >
            <BookOpen className="h-6 w-6" />
            Info Satwa
          </Link>
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 text-lg text-gray-700"
          >
            <Home className="h-6 w-6" />
            Beranda
          </Link>
        </div>
      </div>
    </>
  );
}