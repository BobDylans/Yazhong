"use client";

import { MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/lib/config";

const WHATSAPP_MESSAGE = "Hi! I'm interested in your products.";

export function WhatsAppButton() {
  const url = whatsappUrl(WHATSAPP_MESSAGE);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl hover:bg-[#22c35e] active:scale-95 animate-[wa-pulse_2s_ease-in-out_infinite]"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-7 w-7 md:h-8 md:w-8" fill="currentColor" />
    </a>
  );
}
