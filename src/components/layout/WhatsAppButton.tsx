"use client";

import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const openWhatsApp = () => {
    window.open("https://wa.me/1234567890", "_blank");
  };

  return (
    <button
      onClick={openWhatsApp}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110 active:scale-95"
      aria-label="Contact via WhatsApp"
    >
      <MessageCircle className="h-8 w-8" />
    </button>
  );
}
