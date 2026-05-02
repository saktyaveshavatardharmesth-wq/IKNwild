"use client";

import { motion } from "framer-motion";
import { MapPin, Info, BarChart3, AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex flex-col gap-12 pb-20">
      {/* Hero Section */}
      <section className="relative bg-forest-green py-20 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl"
          >
            <h1 className="mb-6 text-4xl font-extrabold md:text-6xl">
              Harmony with Nature in IKN.
            </h1>
            <p className="mb-8 text-lg text-white/80 md:text-xl">
              Real-time wildlife monitoring and reporting system to ensure safety for both humans and animals in the new capital.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/login"
                className="rounded-lg bg-alert-orange px-8 py-3 font-bold text-white transition-colors hover:bg-alert-orange/90"
              >
                Staff Portal
              </Link>
              <button className="rounded-lg bg-white/10 px-8 py-3 font-bold text-white backdrop-blur-md transition-colors hover:bg-white/20">
                View Live Map
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Features Navigation */}
      <section className="container mx-auto px-4">
        <div className="grid gap-6 md:grid-cols-3">
          <FeatureCard
            icon={<MapPin className="h-8 w-8 text-forest-green" />}
            title="Interactive Map"
            description="Explore wildlife distribution and protection status across IKN regions."
            link="/education#map"
          />
          <FeatureCard
            icon={<BarChart3 className="h-8 w-8 text-forest-green" />}
            title="Conflict Stats"
            description="Historical data on wildlife encounters to aid prevention."
            link="/education#stats"
          />
          <FeatureCard
            icon={<Info className="h-8 w-8 text-forest-green" />}
            title="Safety Guide"
            description="DOs & DON'Ts when encountering wildlife in the area."
            link="/education"
          />
        </div>
      </section>

      {/* Education Section Snippet */}
      <section id="education" className="bg-slate-50 py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <AlertTriangle className="h-8 w-8 text-alert-orange" />
            <h2 className="text-3xl font-bold">Safety DOs & DON'Ts</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-2xl border bg-white p-8 shadow-sm">
              <h3 className="mb-4 text-xl font-bold text-forest-green">DOs</h3>
              <ul className="space-y-3 text-slate-600">
                <li className="flex gap-2">✅ <span>Keep a minimum distance of 50 meters.</span></li>
                <li className="flex gap-2">✅ <span>Report sightings via our staff or call center.</span></li>
                <li className="flex gap-2">✅ <span>Store food and waste in secure containers.</span></li>
              </ul>
            </div>
            <div className="rounded-2xl border bg-white p-8 shadow-sm">
              <h3 className="mb-4 text-xl font-bold text-red-600">DON'Ts</h3>
              <ul className="space-y-3 text-slate-600">
                <li className="flex gap-2">❌ <span>Do not feed wild animals under any circumstances.</span></li>
                <li className="flex gap-2">❌ <span>Do not approach or take selfies with wildlife.</span></li>
                <li className="flex gap-2">❌ <span>Do not attempt to catch or harm protected species.</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description, link }: { icon: any, title: string, description: string, link: string }) {
  return (
    <Link
      href={link}
      className="group rounded-2xl border bg-white p-8 transition-all hover:border-forest-green hover:shadow-lg"
    >
      <div className="mb-4 rounded-xl bg-forest-green/10 p-3 w-fit group-hover:bg-forest-green group-hover:text-white transition-colors">
        {icon}
      </div>
      <h3 className="mb-2 text-xl font-bold">{title}</h3>
      <p className="text-slate-600">{description}</p>
    </Link>
  );
}
