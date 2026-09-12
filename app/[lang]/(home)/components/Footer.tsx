"use client";

import React, { useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowUp } from "lucide-react";
import { useAnimationFade } from "../hooks/useAnimationFade";

export default function Footer() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const topHeaderRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);

  useAnimationFade({
    sectionRef,
    elements: [
      topHeaderRef,
      titleRef,
      quoteRef,
      buttonRef,
      bottomBarRef,
    ],
    start: "top 75%",
    staggerDelay: "-=0.45",
    duration: 0.8,
  });

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer
      id="footer"
      ref={sectionRef}
      className="relative w-full min-h-dvh flex flex-col justify-between py-12 sm:py-16 md:py-20 px-6 sm:px-12 md:px-16 transition-colors duration-500 overflow-hidden bg-bg-primary select-none"
    >
      {/* Top Header Row */}
      <div ref={topHeaderRef} className="max-w-7xl mx-auto w-full flex items-center justify-between border-b border-current/10 pb-6">
        <div className="flex items-center gap-2">
          <span className="font-cinzel text-xs sm:text-sm font-bold tracking-[0.3em] uppercase opacity-80">
            {t.footer.tagline}
          </span>
        </div>
        <span className="text-[10px] sm:text-xs font-cinzel tracking-widest uppercase opacity-60">
          {t.footer.portfolioLabel} {"//"} {new Date().getFullYear()}
        </span>
      </div>

      {/* Middle Climax Editorial Typography */}
      <div className="max-w-7xl mx-auto w-full my-auto py-8 flex flex-col items-center text-center">
        <h2 ref={titleRef} className="font-editorial text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold uppercase tracking-tight leading-[0.95] opacity-90">
          {t.footer.titlePart1} <br />
          <span className="font-light italic">{t.footer.titlePart2}</span>
        </h2>

        <p ref={quoteRef} className="mt-6 font-editorial text-lg sm:text-2xl italic opacity-75 max-w-2xl">
          &ldquo;{t.footer.quote}&rdquo;
        </p>

        {/* Back to Top CTA */}
        <button
          ref={buttonRef}
          onClick={scrollToTop}
          className="group mt-10 flex items-center gap-3 px-8 py-4 rounded-full border border-current/25 hover:border-current bg-current/5 hover:bg-current/10 transition-all duration-300 text-xs sm:text-sm font-cinzel tracking-widest uppercase cursor-pointer hover:scale-105 active:scale-95 shadow-xl"
        >
          <span>{t.footer.backToTop}</span>
          <ArrowUp size={16} className="group-hover:-translate-y-1 transition-transform" />
        </button>
      </div>

      {/* Bottom Bar: Copyright & Legal */}
      <div ref={bottomBarRef} className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-current/10 text-xs font-cinzel opacity-60 tracking-wider">
        <div>
          © {new Date().getFullYear()} — {t.footer.rights}
        </div>
        <div className="flex items-center gap-6">
          <button
            onClick={() => {
              if (typeof window !== "undefined") {
                window.dispatchEvent(new CustomEvent("open-legal-modal", { detail: { tab: "cookies" } }));
              }
            }}
            className="hover:underline hover:opacity-100 transition-opacity cursor-pointer"
          >
            {t.legal.footerLink}
          </button>
          <span>•</span>
          <span>{t.footer.devotion}</span>
        </div>
      </div>
    </footer>
  );
}
