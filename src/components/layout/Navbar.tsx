"use client";

import Link from "next/link";
import { Shield, Menu, User } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Shield className="h-8 w-8 text-forest-green" />
          <span className="text-xl font-bold tracking-tight text-forest-green">
            IKNwild
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-forest-green"
          >
            <User className="h-5 w-5" />
            <span>Staff Login</span>
          </Link>
          <button className="rounded-full p-2 hover:bg-slate-100 md:hidden">
            <Menu className="h-6 w-6 text-slate-600" />
          </button>
        </div>
      </div>
    </nav>
  );
}
