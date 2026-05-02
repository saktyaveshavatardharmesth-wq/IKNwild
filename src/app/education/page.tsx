"use client";

import { Info, BarChart3, Map as MapIcon, ShieldCheck, HeartPulse, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function EducationPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <header className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-extrabold text-forest-green">Wildlife Education Center</h1>
        <p className="mx-auto max-w-2xl text-lg text-slate-500">
          Learn how to live safely alongside the unique wildlife of Ibu Kota Nusantara.
        </p>
      </header>

      {/* Tabs / sections */}
      <div className="mb-16 grid gap-8 md:grid-cols-3">
         <EduCard 
            icon={<ShieldCheck className="h-6 w-6" />}
            title="Safe Encounters"
            desc="Step-by-step guides for animal meetings."
            color="bg-blue-500"
         />
         <EduCard 
            icon={<HeartPulse className="h-6 w-6" />}
            title="First Aid"
            desc="What to do in case of bites or scratches."
            color="bg-red-500"
         />
         <EduCard 
            icon={<Zap className="h-6 w-6" />}
            title="Quick SOPs"
            desc="Emergency protocols for workers."
            color="bg-amber-500"
         />
      </div>

      {/* Infographic Section */}
      <section className="mb-20 rounded-[2.5rem] bg-forest-green p-8 text-white md:p-16">
        <h2 className="mb-10 text-3xl font-bold">Wildlife Safety DOs & DON'Ts</h2>
        <div className="grid gap-12 md:grid-cols-2">
          <div className="space-y-6">
             <h3 className="text-xl font-bold uppercase tracking-widest text-white/60">The "Safe" List</h3>
             <ul className="space-y-4">
                <ListItem text="Keep 50m distance from all mammals." />
                <ListItem text="Always wear high-visibility gear (Workers)." />
                <ListItem text="Report any sighting within 5 minutes." />
                <ListItem text="Use the WhatsApp call center for advice." />
             </ul>
          </div>
          <div className="space-y-6">
             <h3 className="text-xl font-bold uppercase tracking-widest text-white/60">The "Danger" List</h3>
             <ul className="space-y-4">
                <ListItem text="Never feed monkeys or wild boars." danger />
                <ListItem text="Do not approach sun bears for photos." danger />
                <ListItem text="Avoid high grass areas at night." danger />
                <ListItem text="Never attempt to handle snakes yourself." danger />
             </ul>
          </div>
        </div>
      </section>

      {/* Stats Preview */}
      <section className="mb-20">
        <div className="mb-8 flex items-center gap-3">
          <BarChart3 className="h-8 w-8 text-forest-green" />
          <h2 className="text-3xl font-bold">Conflict Statistics (2026)</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
           <div className="rounded-3xl border bg-white p-8 shadow-sm">
              <h3 className="mb-6 font-bold text-slate-400 uppercase text-sm">Monthly Incidents</h3>
              <div className="flex h-40 items-end gap-4">
                 <Bar height="h-20" label="Jan" />
                 <Bar height="h-32" label="Feb" />
                 <Bar height="h-24" label="Mar" />
                 <Bar height="h-40" label="Apr" active />
              </div>
           </div>
           <div className="rounded-3xl border bg-white p-8 shadow-sm">
              <h3 className="mb-6 font-bold text-slate-400 uppercase text-sm">Animal Frequency</h3>
              <div className="space-y-4">
                 <Progress label="Monkeys" value={65} />
                 <Progress label="Snakes" value={25} />
                 <Progress label="Sun Bears" value={10} />
              </div>
           </div>
        </div>
      </section>
    </div>
  );
}

function EduCard({ icon, title, desc, color }: any) {
  return (
    <div className="rounded-3xl border bg-white p-6 shadow-sm transition-transform hover:-translate-y-1">
      <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl text-white ${color}`}>
        {icon}
      </div>
      <h3 className="mb-2 text-xl font-bold">{title}</h3>
      <p className="text-slate-500">{desc}</p>
    </div>
  );
}

function ListItem({ text, danger }: { text: string, danger?: boolean }) {
  return (
    <li className="flex items-center gap-3 font-medium">
      <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-sm ${danger ? 'bg-red-500/20 text-red-300' : 'bg-white/20 text-white'}`}>
        {danger ? '!' : '✓'}
      </span>
      {text}
    </li>
  );
}

function Bar({ height, label, active }: any) {
  return (
    <div className="flex flex-1 flex-col items-center gap-2">
      <div className={`w-full rounded-t-lg transition-all ${height} ${active ? 'bg-forest-green' : 'bg-slate-100 group-hover:bg-slate-200'}`}></div>
      <span className="text-xs font-bold text-slate-400">{label}</span>
    </div>
  );
}

function Progress({ label, value }: any) {
  return (
    <div>
      <div className="mb-1 flex justify-between text-sm font-bold">
        <span>{label}</span>
        <span className="text-slate-400">{value}%</span>
      </div>
      <div className="h-2 w-full rounded-full bg-slate-100">
        <div className="h-full rounded-full bg-forest-green" style={{ width: `${value}%` }}></div>
      </div>
    </div>
  );
}
