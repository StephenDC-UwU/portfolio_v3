"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import Sword from "./illustrations/Sword";
import RoseBotanical from "./illustrations/RoseBotanical";
import SplatterArt from "./illustrations/SplatterArt";
import { ArrowDown, Sparkles, Compass } from "lucide-react";

// Predefined petal positions for pure deterministic rendering
const STATIC_PETALS = [
  { top: -25, left: 15, scale: 0.8, rotate: 24 },
  { top: -45, left: 28, scale: 1.1, rotate: -35 },
  { top: -15, left: 42, scale: 0.7, rotate: 60 },
  { top: -60, left: 55, scale: 1.0, rotate: -15 },
  { top: -30, left: 68, scale: 0.9, rotate: 45 },
  { top: -50, left: 82, scale: 1.2, rotate: -70 },
  { top: -20, left: 22, scale: 0.65, rotate: 15 },
  { top: -70, left: 35, scale: 1.05, rotate: 80 },
  { top: -35, left: 62, scale: 0.85, rotate: -40 },
  { top: -55, left: 75, scale: 0.95, rotate: 30 },
  { top: -10, left: 88, scale: 0.75, rotate: -10 },
  { top: -40, left: 48, scale: 1.15, rotate: 50 },
];

export default function Hero() {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const heroRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const swordRef = useRef<HTMLDivElement>(null);
  const rosesRef = useRef<HTMLDivElement>(null);
  const splattersRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const petalsContainerRef = useRef<HTMLDivElement>(null);

  const isDark = theme === "crimson";

  // GSAP Entrance Timeline & Petal Physics
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 1. Reveal Headline text elements
      if (headlineRef.current) {
        const textElements = headlineRef.current.querySelectorAll(".hero-animate-text");
        tl.fromTo(
          textElements,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, stagger: 0.15 },
          0.3
        );
      }

      // 2. Sword reveal
      if (swordRef.current) {
        tl.fromTo(
          swordRef.current,
          { y: 120, opacity: 0, scale: 0.9 },
          { y: 0, opacity: 1, scale: 1, duration: 1.4, ease: "power4.out" },
          0.5
        );
      }

      // 3. Roses & Splatters reveal
      if (rosesRef.current) {
        tl.fromTo(
          rosesRef.current,
          { opacity: 0, scale: 0.9, y: 40 },
          { opacity: 1, scale: 1, y: 0, duration: 1.5, ease: "power2.out" },
          0.7
        );
      }

      if (splattersRef.current) {
        tl.fromTo(
          splattersRef.current,
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 1.2 },
          0.6
        );
      }

      // 4. CTA buttons reveal
      if (ctaRef.current) {
        tl.fromTo(
          ctaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.9 },
          1.1
        );
      }

      // 5. Continuous Petal Drift Animation
      if (petalsContainerRef.current) {
        const petals = petalsContainerRef.current.querySelectorAll(".drifting-petal");
        petals.forEach((petal, i) => {
          gsap.to(petal, {
            y: 700 + i * 30,
            x: i % 2 === 0 ? 80 : -80,
            rotation: i % 2 === 0 ? 180 : -180,
            duration: 10 + (i % 5) * 1.5,
            repeat: -1,
            ease: "none",
            delay: i * 0.8,
          });
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, [theme]);

  // Subtle Mouse Parallax Effect
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!heroRef.current) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const xPos = (clientX / innerWidth - 0.5) * 2;
    const yPos = (clientY / innerHeight - 0.5) * 2;

    if (swordRef.current) {
      gsap.to(swordRef.current, {
        x: xPos * 14,
        y: yPos * 10,
        rotation: xPos * 1.5,
        duration: 1.2,
        ease: "power1.out",
      });
    }

    if (headlineRef.current) {
      gsap.to(headlineRef.current, {
        x: xPos * -10,
        y: yPos * -8,
        duration: 1.4,
        ease: "power1.out",
      });
    }

    if (rosesRef.current) {
      gsap.to(rosesRef.current, {
        x: xPos * 8,
        y: yPos * 6,
        duration: 1.6,
        ease: "power1.out",
      });
    }

    if (splattersRef.current) {
      gsap.to(splattersRef.current, {
        x: xPos * 18,
        y: yPos * 14,
        duration: 1.8,
        ease: "power1.out",
      });
    }
  };

  const scrollToProjects = () => {
    const el = document.getElementById("projects");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full flex flex-col justify-between pt-24 sm:pt-28 md:pt-32 pb-8 sm:pb-12 px-4 sm:px-8 md:px-14 overflow-hidden select-none transition-colors duration-500"
    >
      {/* Background Ambience & Splatters (Dark mode dynamic splatter) */}
      <div
        ref={splattersRef}
        className={`absolute inset-0 pointer-events-none transition-opacity duration-700 z-0 ${
          isDark ? "opacity-100" : "opacity-0"
        }`}
      >
        <SplatterArt className="w-full h-full object-cover scale-105" />
      </div>

      {/* Floating Petals Layer (Light mode romantic gothic ambiance) */}
      <div
        ref={petalsContainerRef}
        className={`absolute inset-0 pointer-events-none z-10 overflow-hidden transition-opacity duration-700 ${
          !isDark ? "opacity-100" : "opacity-20"
        }`}
      >
        {STATIC_PETALS.map((petal, i) => (
          <div
            key={i}
            className="drifting-petal absolute w-3.5 h-5 rounded-full"
            style={{
              top: `${petal.top}px`,
              left: `${petal.left}%`,
              background:
                "radial-gradient(ellipse at 30% 30%, #C73833 0%, #8F201D 70%, #58120F 100%)",
              opacity: 0.75,
              filter: "blur(0.5px)",
              transform: `scale(${petal.scale}) rotate(${petal.rotate}deg)`,
            }}
          />
        ))}
      </div>

      {/* Top / Middle Content: Main Editorial Headline */}
      <div className="relative z-20 max-w-7xl mx-auto w-full flex flex-col items-start pt-6 sm:pt-10 md:pt-14">
        <div ref={headlineRef} className="w-full">
          {/* Subtle Tagline */}
          <div className="hero-animate-text flex items-center gap-2 mb-3 sm:mb-4">
            <span className="w-6 sm:w-10 h-[1px] bg-current opacity-40" />
            <span className="text-[11px] sm:text-xs md:text-sm uppercase tracking-[0.3em] font-cinzel opacity-75 font-semibold">
              {isDark ? "Crimson Edition" : "Editorial Exhibition"}
            </span>
          </div>

          {/* Large Title: "ART IS EVERYWHERE" matching reference images */}
          <div className="hero-animate-text flex flex-col leading-[0.88] tracking-tight">
            {/* First Line: "ART IS" */}
            <div className="flex items-baseline gap-3 sm:gap-6 flex-wrap">
              <h1 className="font-editorial text-6xl sm:text-8xl md:text-9xl lg:text-[130px] font-bold uppercase tracking-normal">
                {t.hero.headlinePart1}
              </h1>
              <span className="font-editorial text-4xl sm:text-6xl md:text-8xl lg:text-[100px] font-light uppercase tracking-widest opacity-90">
                {t.hero.headlinePart2}
              </span>
            </div>

            {/* Second Line: "EVERYWHERE" */}
            <h2 className="font-editorial text-5xl sm:text-7xl md:text-9xl lg:text-[124px] font-normal uppercase tracking-wider sm:tracking-[0.12em] mt-1 sm:mt-2">
              {t.hero.headlinePart3}
            </h2>
          </div>

          {/* Subtitle & Action CTAs */}
          <div className="hero-animate-text mt-4 sm:mt-6 md:mt-8 max-w-xl">
            <p className="text-sm sm:text-base md:text-lg opacity-85 font-light leading-relaxed font-sans-clean">
              {t.hero.subtitle}
            </p>

            <div
              ref={ctaRef}
              className="flex items-center gap-3 sm:gap-4 mt-6 sm:mt-8 flex-wrap"
            >
              <button
                onClick={scrollToProjects}
                className="group relative px-6 sm:px-8 py-3 rounded-full text-xs sm:text-sm font-cinzel tracking-wider font-semibold uppercase overflow-hidden transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105 active:scale-95 cursor-pointer"
                style={{
                  backgroundColor: "var(--text-primary)",
                  color: "var(--bg-primary)",
                }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Compass size={15} className="group-hover:rotate-45 transition-transform" />
                  {t.hero.ctaExplore}
                </span>
              </button>

              <button
                onClick={scrollToContact}
                className="group px-6 sm:px-7 py-3 rounded-full text-xs sm:text-sm font-cinzel tracking-wider font-semibold uppercase glass-card hover:bg-black/5 dark:hover:bg-white/10 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <Sparkles size={15} className="opacity-70 group-hover:opacity-100" />
                  {t.hero.ctaContact}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Central Visual Showcase: The Sword & Blooming Roses */}
      <div className="relative z-10 w-full flex flex-col items-center justify-end mt-10 sm:mt-4 pointer-events-none">
        {/* Sword Element */}
        <div
          ref={swordRef}
          className="relative w-36 sm:w-48 md:w-56 lg:w-64 h-[260px] sm:h-[340px] md:h-[420px] lg:h-[480px] -mb-16 sm:-mb-24 md:-mb-32 z-20 filter drop-shadow-2xl"
        >
          <Sword isDark={isDark} className="w-full h-full" />
        </div>

        {/* Botanical Roses Layer (Anchors the sword with lush flora) */}
        <div
          ref={rosesRef}
          className={`w-full max-w-4xl h-[180px] sm:h-[260px] md:h-[320px] z-30 transition-all duration-700 ${
            isDark ? "opacity-30 scale-95" : "opacity-100 scale-100"
          }`}
        >
          <RoseBotanical isDark={isDark} className="w-full h-full" />
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="relative z-20 w-full flex justify-between items-end pt-4 border-t border-current/10">
        <div className="flex items-center gap-2 text-[11px] sm:text-xs font-cinzel tracking-widest uppercase opacity-60">
          <span className="inline-block w-2 h-2 rounded-full bg-current animate-ping" />
          <span>SPA v3.0 // Interactive Experience</span>
        </div>

        <button
          onClick={scrollToProjects}
          className="flex items-center gap-2 text-xs font-cinzel tracking-widest uppercase opacity-70 hover:opacity-100 transition-opacity cursor-pointer group"
        >
          <span className="hidden sm:inline">{t.hero.scrollDown}</span>
          <div className="p-2 rounded-full border border-current/20 group-hover:border-current group-hover:translate-y-1 transition-all">
            <ArrowDown size={14} />
          </div>
        </button>
      </div>
    </section>
  );
}
