"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowUp, Sparkles } from "lucide-react";

export default function Footer() {
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full py-16 px-4 sm:px-8 md:px-14 border-t border-current/10 transition-colors duration-500 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left: Brand / Editorial Signature */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-2">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="opacity-70" />
            <span className="font-cinzel text-sm font-bold tracking-widest uppercase">
              ART IS EVERYWHERE
            </span>
          </div>
          <p className="font-editorial text-lg italic opacity-80 max-w-md">
            {t.footer.quote}
          </p>
        </div>

        {/* Right: Copyright & Scroll to Top */}
        <div className="flex flex-col sm:flex-row items-center gap-6 text-center md:text-right">
          <div className="text-xs font-cinzel opacity-60 tracking-wider">
            © {new Date().getFullYear()} — {t.footer.rights}
          </div>

          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 px-4 py-2 rounded-full border border-current/20 hover:border-current bg-current/5 hover:bg-current/10 transition-all text-xs font-cinzel tracking-wider uppercase cursor-pointer"
          >
            <span>{t.footer.backToTop}</span>
            <ArrowUp size={14} className="group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
