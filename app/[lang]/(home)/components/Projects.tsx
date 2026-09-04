"use client";

import React, { useState, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { GithubIcon } from "@/components/Icons";
import { useAnimationFade } from "../hooks/useAnimationFade";

export default function Projects() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState("all");

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useAnimationFade({
    sectionRef,
    elements: [headerRef, gridRef],
    start: "top 60%",
    staggerDelay: "-=0.35",
    duration: 0.85,
  });

  const imageBackgrounds: Record<string, string> = {
    "1": "radial-gradient(circle at 70% 30%, #8E201D 0%, #450D0B 80%)",
    "2": "radial-gradient(circle at 30% 70%, #5B1614 0%, #2A0908 90%)",
    "3": "radial-gradient(circle at 50% 50%, #7A1C18 0%, #380B09 85%)",
    "4": "radial-gradient(circle at 80% 20%, #6E1715 0%, #1F0504 90%)",
  };

  const filteredProjects =
    filter === "all"
      ? t.projects.items
      : t.projects.items.filter((p) => p.category === filter);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="section section-projects relative w-full min-h-screen overflow-hidden transition-colors duration-500 bg-bg-primary"
    >
      <div className="section-content w-full h-full relative">
        <div className="section-inner w-full min-h-screen flex flex-col justify-center py-24 sm:py-32 px-4 sm:px-8 md:px-14 relative">
          <div className="max-w-7xl mx-auto w-full">
            {/* Section Header & Filters */}
            <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 sm:mb-20">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-[1px] bg-current opacity-40" />
                  <span className="text-xs uppercase tracking-[0.3em] font-cinzel font-semibold opacity-75">
                    {t.projects.tagline}
                  </span>
                </div>
                <h2 className="font-editorial text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.05]">
                  {t.projects.title}
                </h2>
              </div>

              {/* Category Filter Tabs */}
              <div className="flex items-center gap-2 flex-wrap">
                {[
                  { id: "all", label: t.projects.filterAll },
                  { id: "creative", label: t.projects.filterCreative },
                  { id: "apps", label: t.projects.filterApp },
                  { id: "design", label: t.projects.filterDesign },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setFilter(tab.id)}
                    className={`px-4 py-2 rounded-full text-xs font-cinzel tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                      filter === tab.id
                        ? "bg-current text-white dark:text-black font-semibold shadow-md scale-105"
                        : "border border-current/20 hover:border-current/60 opacity-75 hover:opacity-100"
                    }`}
                    style={{
                      backgroundColor: filter === tab.id ? "var(--text-primary)" : "transparent",
                      color: filter === tab.id ? "var(--bg-primary)" : "var(--text-primary)",
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Projects Grid */}
            <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
              {filteredProjects.map((project) => (
                <article
                  key={project.id}
                  className="group relative rounded-3xl glass-card overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl flex flex-col justify-between"
                >
                  {/* Project Card Image Banner / Abstract Canvas */}
                  <div
                    className="relative w-full h-56 sm:h-72 overflow-hidden flex items-center justify-center p-6"
                    style={{ background: imageBackgrounds[project.id] || imageBackgrounds["1"] }}
                  >
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                    
                    {/* Floating badge */}
                    <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-white text-[11px] font-cinzel tracking-wider uppercase border border-white/10">
                      <Sparkles size={12} />
                      <span>{project.categoryLabel}</span>
                    </div>

                    <div className="absolute top-4 right-4 z-10 text-white/70 text-xs font-cinzel">
                      {project.year}
                    </div>

                    {/* Decorative Art Motif inside preview */}
                    <div className="relative z-10 text-center text-white/90 p-4">
                      <span className="font-editorial text-2xl sm:text-3xl font-light italic tracking-wider block transform group-hover:scale-110 transition-transform duration-500">
                        {project.title.split("—")[0]}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                    <div className="space-y-3">
                      <h3 className="font-editorial text-2xl sm:text-3xl font-bold tracking-tight group-hover:text-current transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm sm:text-base opacity-80 font-light leading-relaxed font-sans-clean">
                        {project.description}
                      </p>
                    </div>

                    {/* Tags & Action Links */}
                    <div className="pt-4 border-t border-current/10 flex items-center justify-between gap-4 flex-wrap">
                      <div className="flex items-center gap-2 flex-wrap">
                        {project.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-current/5 border border-current/10 opacity-80"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          className="p-2 rounded-full border border-current/20 hover:border-current hover:bg-current/10 transition-all cursor-pointer"
                          title="GitHub Repository"
                          aria-label="GitHub Repository"
                        >
                          <GithubIcon size={16} />
                        </button>
                        <button
                          className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-cinzel uppercase tracking-wider font-semibold hover:scale-105 transition-all cursor-pointer"
                          style={{
                            backgroundColor: "var(--text-primary)",
                            color: "var(--bg-primary)",
                          }}
                        >
                          <span>{t.projects.viewProject}</span>
                          <ArrowUpRight size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
