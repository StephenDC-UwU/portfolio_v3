"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useHeroAnimation } from "../hooks/useHeroAnimation";
import Image from "next/image";
import sword from "@/app/assets/hero/sword.svg"
import roseLeft from "@/app/assets/hero/roses-lefth.png"
import spotBleed from "@/app/assets/hero/spot-bleed.svg"
import AnimationTitleHero from "./hero/AnimationTitleHero";


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
  const { t } = useLanguage();
  const {
    heroRef,
    headlineRef,
    splattersRef,
    petalsContainerRef,
    swordRef,
    isDark,
    isInside,
    handleSwordClick,
  } = useHeroAnimation();


  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-dvh w-full flex items-center overflow-hidden"
    >

      {/* Spot Bleed */}
      <Image
        src={spotBleed}
        alt="Spot Bleed"
        priority
        className={`absolute inset-0 w-full h-full object-cover object-bottom md:object-top pointer-events-none z-0 transition-opacity duration-700 ${isDark ? "opacity-60" : "opacity-0"
          }`}

      />

      {/* Background Ambience & Splatters (Dark mode dynamic splatter) */}
      <div className="w-full h-full ">

        <div
          ref={splattersRef}
          className={`absolute inset-0 pointer-events-none transition-opacity duration-700 z-0 ${isDark ? "opacity-100" : "opacity-0"
            }`}
        >
        </div>

        {/* Floating Petals Layer (Dynamic romantic / gothic cream petals) */}
        <div
          ref={petalsContainerRef}
          className="absolute inset-0 pointer-events-none z-10 overflow-hidden transition-opacity duration-700 opacity-100"
        >
          {STATIC_PETALS.map((petal, i) => (
            <div
              key={i}
              className="drifting-petal absolute w-3.5 h-5 rounded-full"
              style={{
                top: `${petal.top}px`,
                left: `${petal.left}%`,
                background: "var(--petal-gradient)",
                opacity: isDark ? 0.85 : 0.75,
                filter: "blur(0.5px)",
                transform: `scale(${petal.scale}) rotate(${petal.rotate}deg)`,
              }}
            />
          ))}
        </div>


        {/* Main Content */}

        <div className="w-full max-w-6xl mx-auto px-5 xl:px-0 lg:pb-20 ">
          {/* Top / Middle Content: Main Editorial Headline */}
          <div className="relative z-20">
            <div ref={headlineRef}>

              {/* Large Title: "ART IS EVERYWHERE" matching reference images */}
              <h1 className="hero-animate-text font-cinzel uppercase ">
                {/* First Line: "ART" */}
                <span className="text-4xl sm:text-6xl md:text-6xl lg:text-8xl font-black">
                  {/* <span>{t.hero.headlinePart1}</span> */}
                  <AnimationTitleHero initWord={t.hero.headlinePart1} />
                  {/* Second Line: "IS" */}
                  <span className="font-normal text-2xl sm:text-5xl md:text-6xl lg:text-7xl ">
                    {' '}{t.hero.headlinePart2}
                  </span>
                </span>

                {/* Second Line: "EVERYWHERE" */}
                <span className="block text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal ">
                  {t.hero.headlinePart3}
                </span>
              </h1>
            </div>
          </div>
        </div>


        {/* Sword Image (fixed to bottom) */}
        <div
          onClick={handleSwordClick}
          ref={swordRef}
          role="button"
          tabIndex={0}
          aria-label="Toggle theme"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handleSwordClick();
            }
          }}
          className={`absolute bottom-[-40dvh] left-1/2 -translate-x-1/2 z-30 cursor-pointer  origin-bottom select-none transition-opacity duration-500 ${isInside ? "opacity-100" : " opacity-80"}`}
        >
          <Image
            src={sword}
            alt="Sword"
            priority
            className="h-[80dvh] w-auto object-contain pointer-events-none"
            draggable={false}
          />
        </div>

        {/* Roses Image (fixed to bottom right corner, overlapping sword) */}
        <div
          className={`absolute bottom-[-10dvh] lg:left-1/2 lg:-translate-x-1/2 pointer-events-none z-10 flex flex-row transition-all duration-700 ${isDark
            ? "!opacity-0 invisible pointer-events-none"
            : "opacity-100 slide-in-blurred-bottom"
            }`}
        >
          <Image
            src={roseLeft}
            alt="Roses"
            priority
            className="h-[50dvh] lg:h-[40dvh] w-auto object-contain"
          />

          <Image
            src={roseLeft}
            alt="Roses"
            priority
            className="h-[60dvh] lg:h-[40dvh] w-auto object-contain hidden lg:block rotate-y-180" />
        </div>

      </div>
    </section>
  );
}
