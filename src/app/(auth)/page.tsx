import React from 'react'
import { RoleCard } from "@/components/RoleCard";
import { Trees, Wrench, Users } from "lucide-react";

const roles = [
  {
    image: "polhut.webp",
    badge: { icon: <Trees size={16} />, label: "FOREST RANGER" },
    title: "Polisi Hutan",
    description: "Pantau lapangan dan tindak lanjuti laporan satwa liar.",
    href: "/login/polhut",
  },
  {
    image: "worker.webp",
    badge: { icon: <Wrench size={16} />, label: "WORKER" },
    title: "Pekerja Konstruksi",
    description: "Laporkan gangguan satwa liar di area kerja Anda.",
    href: "/login/worker",
  },
  {
    image: "masyarakat.webp",
    badge: { icon: <Users size={16} />, label: "PUBLIC" },
    title: "Masyarakat",
    description: "Laporkan aktivitas satwa liar dan dapatkan arahan yang tepat.",
    href: "/education",
  },
];

const RolePage = () => {
  return (
    <div className='relative z-10 pt-5 pb-10'>
        <img src="background.webp" className='absolute inset-0 w-full h-full object-cover -z-10' />
    <div className="absolute inset-0 -z-[5] opacity-60"
      style={{
        background: "linear-gradient(180deg, var(--Colors-Primary-100, #E4EEE2) 40%, var(--Colors-Primary-1000, #283E24) 100%)"
      }}
    />
      <div className='flex flex-col justify-center items-center pt-18 gap-4'>
        <h1 className='text-5xl font-bold text-neutral-1000 md:text-6xl'>
          Welcome to
        </h1>
        <div className='flex items-end'>
          <img src="/icon.webp" className='w-[58px] h-[42px]'/>
          <h2 className='text-4xl font-bold text-primary-1000 md:text-5xl'>
            IKN
            <span className='text-primary-700'>wild</span>
          </h2>
        </div>
        <p className='text-base font-normal text-[#000] w-[361px] h-[63px] flex text-center md:w-full justify-center md:text-lg'>
          Pilih peran Anda untuk mulai melaporkan atau memantau aktivitas satwa liar
        </p>
      </div>

      {/* Cards */}
      <div className='flex flex-col md:flex-row gap-4 px-4 mt-6'>
        {roles.map((role) => (
          <RoleCard key={role.href} {...role} />
        ))}
      </div>
      <div className='flex flex-col gap-2 justify-center mt-10 justify-center items-center'>
        <p className='text-xs text-neutral-200 font-bold'>
          BUTUH BANTUAN LEBIH CEPAT?
        </p>
        <a href="https://wa.me/6281234567890" className='text-lg text-neutral-100 font-bold ml-1 flex items-center gap-1 underline'>
          Hubungi Posko Satwa IKN
        </a>
          </div>
    </div>
  )
}

export default RolePage