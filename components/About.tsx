"use client";

import React, { useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Code2, Terminal, Database, Palette, Sparkles, GitBranch } from "lucide-react";

export default function About() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  const skills = [
    { name: "React, Next.js & TypeScript", icon: Code2, level: "Frontend" },
    { name: "Node.js, Express & REST APIs", icon: Terminal, level: "Backend" },
    { name: "MongoDB & SQL Databases", icon: Database, level: "Database" },
    { name: "Tailwind CSS & UI Design", icon: Palette, level: "Styling" },
    // { name: "State (Redux / Zustand)", icon: Sparkles, level: "Architecture" },
    // { name: "Docker, Git & Testing", icon: GitBranch, level: "Tools" },
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
      className="section section-about relative w-full h-full min-h-dvh flex items-center justify-center transition-colors duration-500 bg-bg-primary overflow-hidden select-none"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-12 py-10 sm:py-14 md:py-16 flex flex-col justify-center h-full">
        {/* Section Header */}
        <div className="mb-6 sm:mb-8 md:mb-10">
          <div className="flex items-center gap-2.5 mb-2">
            <span className="w-6 sm:w-8 h-[1px] bg-current opacity-40" />
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] font-cinzel font-semibold opacity-75">
              {t.about.tagline}
            </span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight max-w-3xl leading-[1.08]">
            {t.about.role}
          </h2>
        </div>

        {/* 2-Column Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
          {/* Left Column: Story & Philosophy */}
          <div className="lg:col-span-7 space-y-3.5 sm:space-y-4">
            <div className="space-y-2.5 sm:space-y-3 text-sm sm:text-base md:text-lg font-light leading-relaxed opacity-85 font-sans-clean">
              <p className="first-letter:font-editorial first-letter:text-4xl sm:first-letter:text-5xl first-letter:float-left first-letter:mr-2.5 first-letter:font-bold first-letter:leading-none">
                {t.about.p1}
              </p>
              <p>{t.about.p2}</p>
            </div>

            {/* Visual Quote Box */}
            <div className="p-3.5 sm:p-5 rounded-2xl glass-card relative overflow-hidden my-2 sm:my-3">
              <div className="absolute top-0 right-0 w-28 h-28 bg-current/5 rounded-full blur-2xl -mr-8 -mt-8" />
              <p className="font-editorial text-base sm:text-xl md:text-2xl italic opacity-95 leading-snug">
                {t.about.quote}
              </p>
            </div>

            {/* Stats Counter Row */}
            {/* <div className="grid grid-cols-3 gap-3 pt-3 sm:pt-4 border-t border-current/10">
              {stats.map((stat, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="font-editorial text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                    {stat.value}
                  </span>
                  <span className="text-[10px] sm:text-xs font-cinzel tracking-wider uppercase opacity-70 mt-0.5">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div> */}


          </div>

          {/* Right Column: Skills & Domains Cards */}
          <div className="lg:col-span-5">
            <div className="p-4 sm:p-6 glass-card space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-current/10 pb-3">
                <h3 className="font-cinzel text-base sm:text-lg font-semibold tracking-wider">
                  {t.about.skillsTitle}
                </h3>
                {/* <span className="text-[10px] sm:text-xs uppercase font-cinzel px-2.5 py-0.5 sm:py-1 rounded-full border border-current/20">
                  Tech & Craft
                </span> */}
              </div>

              <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                {skills.map((skill, index) => {
                  const Icon = skill.icon;
                  return (
                    <div
                      key={index}
                      className="group p-2.5 sm:p-3 rounded-xl border border-current/10 bg-current/5 hover:bg-current/10 transition-all duration-200 flex flex-col justify-between gap-2 hover:-translate-y-0.5"
                    >
                      <div className="flex items-center justify-between">
                        <Icon size={16} className="opacity-80 group-hover:opacity-100" />
                        <span className="text-[9px] sm:text-[10px] font-cinzel uppercase tracking-wider opacity-60">
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
