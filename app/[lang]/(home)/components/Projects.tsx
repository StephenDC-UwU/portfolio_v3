"use client";

import { useState, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useAnimationFade } from "../hooks/useAnimationFade";
import ProjectCard from "./projects/ProjectCard";


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
      className="section section-projects relative w-full transition-colors duration-500 bg-bg-primary"
    >
      <div className="section-content w-full relative">
        <div className="section-inner w-full py-24 sm:py-32 px-4 sm:px-8 md:px-14 relative">
          <div className="max-w-7xl mx-auto w-full">
            {/* Section Header & Filters */}
            <div
              ref={headerRef}
              className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 sm:mb-20"
            >
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
              {/*    <div className="flex items-center gap-2 flex-wrap">
                {[
                  { id: "all", label: t.projects.filterAll },
                  { id: "creative", label: t.projects.filterCreative },
                  { id: "apps", label: t.projects.filterApp },
                  { id: "design", label: t.projects.filterDesign },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setFilter(tab.id)}
                    className={`px-4 py-2 rounded-full text-xs font-cinzel tracking-wider uppercase transition-all duration-200 cursor-pointer ${filter === tab.id
                      ? "bg-current text-white dark:text-black font-semibold shadow-md scale-105"
                      : "border border-current/20 hover:border-current/60 opacity-75 hover:opacity-100"
                      }`}
                    style={{
                      backgroundColor:
                        filter === tab.id ? "var(--text-primary)" : "transparent",
                      color:
                        filter === tab.id ? "var(--bg-primary)" : "var(--text-primary)",
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div> */}
            </div>

            {/* Projects Grid */}
            <div
              ref={gridRef}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10"
            >
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  bgStyle={imageBackgrounds[project.id] || imageBackgrounds["1"]}
                  viewProjectText={t.projects.viewProject}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
