"use client";

import React, { useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Sparkles, Code2, Palette, Layers, Terminal, Cpu } from "lucide-react";

export default function About() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  const skills = [
    { name: "GSAP & Web Animations", icon: Sparkles, level: "Mastery" },
    { name: "Next.js & React 19", icon: Code2, level: "Advanced" },
    { name: "Art Direction & Editorial UI", icon: Palette, level: "Core" },
    { name: "Creative Dev & Shaders", icon: Cpu, level: "Advanced" },
    { name: "Tailwind & Vanilla CSS", icon: Layers, level: "Mastery" },
    { name: "TypeScript & Architecture", icon: Terminal, level: "Advanced" },
  ];

  const stats = [
    { value: "05+", label: t.about.yearsExp },
    { value: "30+", label: t.about.projectsCount },
    { value: "100%", label: t.about.satisfaction },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full py-24 sm:py-32 px-4 sm:px-8 md:px-14 border-t border-current/10 transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 sm:mb-20">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-[1px] bg-current opacity-40" />
            <span className="text-xs uppercase tracking-[0.3em] font-cinzel font-semibold opacity-75">
              {t.about.tagline}
            </span>
          </div>
          <h2 className="font-editorial text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight max-w-3xl leading-[1.05]">
            {t.about.title}
          </h2>
        </div>

        {/* 2-Column Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Story & Philosophy */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            <div className="space-y-4 sm:space-y-6 text-base sm:text-lg md:text-xl font-light leading-relaxed opacity-85 font-sans-clean">
              <p className="first-letter:font-editorial first-letter:text-5xl first-letter:float-left first-letter:mr-3 first-letter:font-bold first-letter:leading-none">
                {t.about.p1}
              </p>
              <p>{t.about.p2}</p>
            </div>

            {/* Visual Quote Box */}
            <div className="p-6 sm:p-8 rounded-2xl glass-card relative overflow-hidden my-6">
              <div className="absolute top-0 right-0 w-32 h-32 bg-current/5 rounded-full blur-2xl -mr-10 -mt-10" />
              <p className="font-editorial text-xl sm:text-2xl italic opacity-95 leading-snug">
                {t.about.quote}
              </p>
            </div>

            {/* Stats Counter Row */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-current/10">
              {stats.map((stat, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="font-editorial text-3xl sm:text-5xl font-bold tracking-tight">
                    {stat.value}
                  </span>
                  <span className="text-[11px] sm:text-xs font-cinzel tracking-wider uppercase opacity-70 mt-1">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Skills & Domains Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl glass-card space-y-6 shadow-xl">
              <div className="flex items-center justify-between border-b border-current/10 pb-4">
                <h3 className="font-cinzel text-lg sm:text-xl font-semibold tracking-wider">
                  {t.about.skillsTitle}
                </h3>
                <span className="text-xs uppercase font-cinzel px-2.5 py-1 rounded-full border border-current/20">
                  Tech & Craft
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {skills.map((skill, index) => {
                  const Icon = skill.icon;
                  return (
                    <div
                      key={index}
                      className="group p-3.5 rounded-xl border border-current/10 bg-current/5 hover:bg-current/10 transition-all duration-200 flex flex-col justify-between gap-3 hover:-translate-y-0.5"
                    >
                      <div className="flex items-center justify-between">
                        <Icon size={18} className="opacity-80 group-hover:opacity-100" />
                        <span className="text-[10px] font-cinzel uppercase tracking-wider opacity-60">
                          {skill.level}
                        </span>
                      </div>
                      <span className="text-xs sm:text-sm font-semibold tracking-tight leading-snug">
                        {skill.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
