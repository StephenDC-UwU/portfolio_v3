"use client";

import React, { useRef, useMemo } from "react";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";
import { useAnimationFade } from "../hooks/useAnimationFade";

function StepIllustration({ index }: { index: number }) {
  if (index === 0) {
    // 01: Converging paths into a central focus node
    return (
      <svg
        viewBox="0 0 240 130"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-[210px] h-28 sm:h-32 text-current transition-transform duration-500 group-hover:scale-105"
        aria-hidden="true"
      >
        {/* Top curved path */}
        <path
          d="M 52 26 C 85 26, 92 65, 118 65"
          stroke="currentColor"
          strokeWidth="1.35"
          strokeLinecap="round"
        />
        <circle
          cx="48"
          cy="26"
          r="3.5"
          stroke="currentColor"
          strokeWidth="1.35"
          fill="var(--bg-primary)"
        />

        {/* Middle straight path */}
        <line
          x1="41"
          y1="65"
          x2="118"
          y2="65"
          stroke="currentColor"
          strokeWidth="1.35"
          strokeLinecap="round"
        />
        <circle
          cx="37"
          cy="65"
          r="3.5"
          stroke="currentColor"
          strokeWidth="1.35"
          fill="var(--bg-primary)"
        />

        {/* Bottom curved path */}
        <path
          d="M 52 104 C 85 104, 92 65, 118 65"
          stroke="currentColor"
          strokeWidth="1.35"
          strokeLinecap="round"
        />
        <circle
          cx="48"
          cy="104"
          r="3.5"
          stroke="currentColor"
          strokeWidth="1.35"
          fill="var(--bg-primary)"
        />

        {/* Outer subtle halo circle */}
        <circle
          cx="134"
          cy="65"
          r="32"
          stroke="currentColor"
          strokeOpacity="0.28"
          strokeWidth="1.1"
        />

        {/* Inner main circle */}
        <circle
          cx="134"
          cy="65"
          r="16"
          stroke="currentColor"
          strokeWidth="1.35"
          fill="currentColor"
          fillOpacity="0.04"
        />

        {/* Center solid dot */}
        <circle cx="134" cy="65" r="3" fill="currentColor" />

        {/* Right output line & solid dot */}
        <line
          x1="166"
          y1="65"
          x2="202"
          y2="65"
          stroke="currentColor"
          strokeWidth="1.25"
        />
        <circle cx="204" cy="65" r="2.8" fill="currentColor" />
      </svg>
    );
  }

  if (index === 1) {
    // 02: Overlapping geometric forms (Square + Diamond + Circle + Plus)
    return (
      <svg
        viewBox="0 0 240 130"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-[210px] h-28 sm:h-32 text-current transition-transform duration-500 group-hover:scale-105"
        aria-hidden="true"
      >
        {/* Top small plus (+) */}
        <line
          x1="120"
          y1="11"
          x2="120"
          y2="19"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
        <line
          x1="116"
          y1="15"
          x2="124"
          y2="15"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
        />

        {/* Left square with subtle fill */}
        <rect
          x="66"
          y="39"
          width="54"
          height="54"
          fill="currentColor"
          fillOpacity="0.08"
          stroke="currentColor"
          strokeWidth="1.3"
        />

        {/* Right circle */}
        <circle
          cx="137"
          cy="66"
          r="30"
          stroke="currentColor"
          strokeWidth="1.3"
        />

        {/* Center rotated diamond */}
        <polygon
          points="120,26 160,66 120,106 80,66"
          stroke="currentColor"
          strokeWidth="1.3"
          fill="currentColor"
          fillOpacity="0.03"
        />

        {/* Center focal dot */}
        <circle cx="120" cy="66" r="2.6" fill="currentColor" />

        {/* Bottom baseline */}
        <line
          x1="46"
          y1="116"
          x2="194"
          y2="116"
          stroke="currentColor"
          strokeOpacity="0.35"
          strokeWidth="1.1"
        />
      </svg>
    );
  }

  // 03: Browser / Prototype wireframe with Play badge
  return (
    <svg
      viewBox="0 0 240 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-[210px] h-28 sm:h-32 text-current transition-transform duration-500 group-hover:scale-105"
      aria-hidden="true"
    >
      {/* Monitor / Window frame */}
      <rect
        x="52"
        y="22"
        width="126"
        height="76"
        rx="6"
        stroke="currentColor"
        strokeWidth="1.35"
      />

      {/* Window top header divider */}
      <line
        x1="52"
        y1="35"
        x2="178"
        y2="35"
        stroke="currentColor"
        strokeOpacity="0.35"
        strokeWidth="1.1"
      />

      {/* Window header 3 dots */}
      <circle cx="62" cy="28.5" r="1.3" fill="currentColor" />
      <circle cx="68" cy="28.5" r="1.3" fill="currentColor" />
      <circle cx="74" cy="28.5" r="1.3" fill="currentColor" />

      {/* Left content block */}
      <rect
        x="65"
        y="45"
        width="40"
        height="38"
        rx="2"
        fill="currentColor"
        fillOpacity="0.1"
        stroke="currentColor"
        strokeWidth="1.2"
      />

      {/* Right top content block */}
      <rect
        x="114"
        y="46"
        width="50"
        height="14"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.2"
      />

      {/* Right bottom content block */}
      <rect
        x="114"
        y="68"
        width="50"
        height="15"
        rx="2"
        fill="currentColor"
        fillOpacity="0.1"
        stroke="currentColor"
        strokeWidth="1.2"
      />

      {/* Stand neck & base */}
      <line
        x1="115"
        y1="98"
        x2="115"
        y2="114"
        stroke="currentColor"
        strokeOpacity="0.4"
        strokeWidth="1.1"
      />
      <line
        x1="92"
        y1="114"
        x2="138"
        y2="114"
        stroke="currentColor"
        strokeOpacity="0.4"
        strokeWidth="1.1"
      />

      {/* Play button badge on bottom right of window */}
      <circle cx="178" cy="88" r="13" fill="currentColor" />
      <polygon
        points="175,82.5 184,88 175,93.5"
        fill="var(--bg-primary)"
      />
    </svg>
  );
}

export default function Process() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsGridRef = useRef<HTMLDivElement>(null);
  const ctaRowRef = useRef<HTMLDivElement>(null);

  const animationElements = useMemo(
    () => [headerRef, cardsGridRef, ctaRowRef],
    []
  );

  useAnimationFade({
    sectionRef,
    elements: animationElements,
    start: "top 75%",
    staggerDelay: "-=0.35",
    duration: 0.85,
  });

  const handleGoToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById("contact");
    if (!target) return;

    gsap.registerPlugin(ScrollTrigger);

    const panel = (target.closest(".panel-section") || target) as HTMLElement;
    const allPanels = Array.from(
      document.querySelectorAll<HTMLElement>(".panel-section")
    );
    const panelIndex = allPanels.indexOf(panel);

    let targetScroll = 0;
    if (panelIndex > 0) {
      for (let i = 0; i < panelIndex; i++) {
        targetScroll += allPanels[i].offsetHeight;
      }
    }

    gsap.killTweensOf(window);
    gsap.killTweensOf(panel);

    allPanels.forEach((p, idx) => {
      if (idx < panelIndex) {
        gsap.set(p, { autoAlpha: 0 });
      } else {
        gsap.set(p, { autoAlpha: 1, scale: 1, filter: "brightness(1)" });
      }
    });

    window.scrollTo(0, targetScroll);
    ScrollTrigger.update();

    gsap.fromTo(
      panel,
      { opacity: 0.3, y: 15 },
      {
        opacity: 1,
        y: 0,
        duration: 0.35,
        ease: "power2.out",
      }
    );
  };

  return (
    <section
      id="process"
      ref={sectionRef}
      className="section section-process relative w-full min-h-dvh flex items-center justify-center transition-colors duration-500 bg-bg-primary select-none py-14 sm:py-16 md:py-20"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-12 pb-24 sm:pb-8 flex flex-col justify-center">
        {/* Section Header */}
        <div ref={headerRef} className="mb-6 sm:mb-8 md:mb-10">
          <div className="flex items-center gap-2.5 mb-2">
            <span className="w-6 sm:w-8 h-[1px] bg-current opacity-40" />
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] font-cinzel font-semibold opacity-75">
              {t.process.tagline}
            </span>
          </div>

          <h2 className="font-editorial text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight max-w-3xl leading-[1.08]">
            {t.process.title}
          </h2>
          <p className="mt-2 sm:mt-3 text-sm sm:text-base opacity-80 font-light max-w-xl font-sans-clean">
            {t.process.subtitle}
          </p>
        </div>

        {/* 3 Process Step Cards */}
        <div
          ref={cardsGridRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-7"
        >
          {t.process.steps.map((step, index) => (
            <div
              key={step.number}
              className="group rounded-xl glass-card p-6 sm:p-8 flex flex-col justify-between min-h-[280px] sm:min-h-[320px] transition-all duration-300 hover:-translate-y-1.5 shadow-xl"
            >
              {/* Step Number (01, 02, 03) */}
              <div className="flex items-center justify-between">
                <span className="font-editorial italic text-2xl sm:text-3xl font-semibold opacity-90">
                  {step.number}
                </span>
              </div>

              {/* Center Minimal Line Illustration */}
              <div className="my-5 sm:my-7 flex items-center justify-center">
                <StepIllustration index={index} />
              </div>

              {/* Step Title & Description */}
              <div className="space-y-1.5">
                <h3 className="font-editorial text-2xl sm:text-3xl font-bold tracking-tight leading-snug">
                  {step.title}
                </h3>
                <p className="font-sans-clean text-xs sm:text-sm font-light opacity-80 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Divider & CTA Row */}
        <div
          ref={ctaRowRef}
          className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-current/10 flex flex-col sm:flex-row sm:items-center justify-between gap-5"
        >
          <div className="space-y-1">
            <h3 className="font-editorial text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-tight">
              {t.process.ctaTitle}
            </h3>
            <p className="font-sans-clean text-xs sm:text-sm font-light opacity-80">
              {t.process.ctaSubtitle}
            </p>
          </div>

          <a
            href="#contact"
            onClick={handleGoToContact}
            className="group self-start sm:self-center inline-flex items-center gap-2.5 px-7 py-3 rounded-xl text-xs sm:text-sm font-cinzel uppercase tracking-widest font-semibold transition-all duration-300 hover:scale-105 active:scale-95 shadow-md cursor-pointer shrink-0"
            style={{
              backgroundColor: "var(--text-primary)",
              color: "var(--bg-primary)",
            }}
          >
            <span>{t.process.ctaButton}</span>
            <ArrowRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
        </div>
      </div>
    </section >
  );
}

