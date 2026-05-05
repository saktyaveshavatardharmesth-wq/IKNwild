import Image from "next/image";
import Link from "next/link";

interface RoleCardProps {
    image: string;
    badge: {
    icon: React.ReactNode;
    label: string;
    };
    title: string;
    description: string;
    href: string;
}

export function RoleCard({ image, badge, title, description, href }: RoleCardProps) {
    return (
        <div className="rounded-2xl overflow-hidden bg-white shadow-sm md:w-[500px]">
        <div className="relative">
        <img
            src={image}
            alt={title}
            width={500}
            height={200}
            className="w-full h-48 object-cover"
        />
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white text-sm font-semibold">
            {badge.icon}
            <span>{badge.label}</span>
        </div>
        </div>

      {/* Content */}
        <div className="p-5">
        <h2 className="text-2xl font-bold text-[#154212] mb-2">{title}</h2>
        <p className="text-gray-600 mb-4">{description}</p>
        <Link href={href} className="text-[#154212] font-semibold flex items-center gap-1">
            Mulai <img src="/arrow.webp" className="w-4 h-4" />
        </Link>
        </div>
    </div>
    );
}