"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Compass, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-bg-primary text-text-primary px-4 sm:px-8 py-16 overflow-hidden transition-colors duration-500 select-none">
      {/* Background Ambient Splatters & Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-accent/10 rounded-full blur-3xl pointer-events-none" />
      
      {/* Floating Organic Decorative Blobs */}
      <div className="absolute top-16 right-16 w-3 h-3 rounded-full bg-accent opacity-60 pointer-events-none animate-pulse" />
      <div className="absolute bottom-20 left-20 w-4 h-4 rounded-full bg-accent opacity-50 pointer-events-none" />
      <div className="absolute top-1/3 left-12 w-2 h-2 rounded-full bg-accent opacity-40 pointer-events-none" />

      {/* Main 404 Glass Card */}
      <div className="relative z-10 max-w-xl w-full text-center glass-card rounded-3xl p-8 sm:p-12 md:p-14 border border-current/15 shadow-2xl space-y-6 sm:space-y-8 animate-in fade-in zoom-in-95 duration-500">
        
        {/* Top Tagline Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-current/5 border border-current/15 text-[10px] sm:text-xs font-cinzel uppercase tracking-[0.25em] font-semibold opacity-80">
          <Compass size={13} className="text-accent" />
          <span>{t.notFound?.tagline || "SENDERO INEXISTENTE"}</span>
        </div>

        {/* Large Stylized 404 */}
        <div className="relative">
          <h1 className="font-cinzel text-7xl sm:text-8xl md:text-9xl font-bold tracking-widest text-accent opacity-90 drop-shadow-lg">
            404
          </h1>
          <span className="absolute -top-3 right-1/4 text-accent/60">
            <Sparkles size={20} />
          </span>
        </div>

        {/* Heading & Description */}
        <div className="space-y-3">
          <h2 className="font-editorial text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
            {t.notFound?.title || "Extraviado en el Vacío"}
          </h2>
          <p className="font-sans-clean text-sm sm:text-base font-light opacity-80 leading-relaxed max-w-md mx-auto">
            {t.notFound?.description ||
              "La página o manuscrito que buscas se ha desvanecido o nunca existió en este plano digital."}
          </p>
        </div>

        {/* Back to Home Button */}
        <div className="pt-2 flex justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 px-6 sm:px-8 py-3 rounded-full text-xs sm:text-sm font-cinzel uppercase tracking-widest font-semibold transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl cursor-pointer"
            style={{
              backgroundColor: "var(--text-primary)",
              color: "var(--bg-primary)",
            }}
          >
            <ArrowLeft size={16} />
            <span>{t.notFound?.backHome || "Regresar al Santuario"}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
