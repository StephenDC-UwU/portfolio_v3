"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Home,
  User,
  LayoutGrid,
  Mail,
  Moon,
  Sun,
  ChevronDown,
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import gsap from "gsap";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { lang, setLang, t } = useLanguage();
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const navRef = useRef<HTMLDivElement>(null);
  const langMenuRef = useRef<HTMLDivElement>(null);

  // GSAP entrance animation
  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { y: -50, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 1, ease: "power3.out", delay: 0.2 }
      );
    }
  }, []);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "projects", "contact"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close language dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(e.target as Node)) {
        setLangMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navItems = [
    { id: "hero", label: t.nav.home, icon: Home, href: "#hero" },
    { id: "about", label: t.nav.about, icon: User, href: "#about" },
    { id: "projects", label: t.nav.projects, icon: LayoutGrid, href: "#projects" },
    { id: "contact", label: t.nav.contact, icon: Mail, href: "#contact" },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-4 md:top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <nav
        ref={navRef}
        className="pointer-events-auto flex items-center justify-between gap-3 sm:gap-6 md:gap-8 px-4 sm:px-7 py-2.5 sm:py-3 rounded-2xl sm:rounded-3xl glass-nav transition-all duration-300 shadow-xl"
        style={{
          minWidth: "min(95vw, 620px)",
        }}
      >
        {/* Navigation Links with Icons & Labels */}
        <div className="flex items-center gap-2 sm:gap-5 md:gap-7">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className={`group flex flex-col items-center justify-center transition-all duration-200 ${
                  isActive ? "opacity-100 scale-105" : "opacity-70 hover:opacity-100"
                }`}
              >
                <div className="relative p-1">
                  <Icon
                    size={20}
                    strokeWidth={1.5}
                    className={`transition-transform duration-200 group-hover:-translate-y-0.5`}
                  />
                  {isActive && (
                    <span
                      className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-current"
                    />
                  )}
                </div>
                <span className="text-[11px] sm:text-xs tracking-wider font-cinzel capitalize transition-colors">
                  {item.label}
                </span>
              </a>
            );
          })}
        </div>

        {/* Separator Line */}
        <div className="h-6 w-[1px] bg-current opacity-20 hidden xs:block" />

        {/* Controls: Language Dropdown & Theme Toggle */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Language Selector */}
          <div className="relative" ref={langMenuRef}>
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-1 text-xs font-cinzel tracking-wider px-2 py-1 rounded-lg opacity-80 hover:opacity-100 transition-all cursor-pointer"
              aria-label="Toggle language"
            >
              <span>{lang.toUpperCase()}</span>
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${
                  langMenuOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {langMenuOpen && (
              <div className="absolute right-0 top-full mt-2 py-1.5 w-24 rounded-xl glass-card shadow-lg z-50 text-xs font-cinzel flex flex-col animate-in fade-in zoom-in-95">
                <button
                  onClick={() => {
                    setLang("es");
                    setLangMenuOpen(false);
                  }}
                  className={`px-3 py-1.5 text-left hover:bg-black/10 transition-colors flex items-center justify-between ${
                    lang === "es" ? "font-bold opacity-100" : "opacity-70"
                  }`}
                >
                  <span>Español</span>
                  {lang === "es" && <span className="text-[10px]">●</span>}
                </button>
                <button
                  onClick={() => {
                    setLang("en");
                    setLangMenuOpen(false);
                  }}
                  className={`px-3 py-1.5 text-left hover:bg-black/10 transition-colors flex items-center justify-between ${
                    lang === "en" ? "font-bold opacity-100" : "opacity-70"
                  }`}
                >
                  <span>English</span>
                  {lang === "en" && <span className="text-[10px]">●</span>}
                </button>
              </div>
            )}
          </div>

          {/* Theme Toggle Button (Moon for Cream mode, Sun for Crimson mode) */}
          <button
            onClick={toggleTheme}
            className="p-1.5 sm:p-2 rounded-full hover:bg-black/10 transition-all opacity-85 hover:opacity-100 hover:rotate-12 cursor-pointer"
            aria-label="Toggle theme mode"
            title={theme === "cream" ? "Modo Carmesí" : "Modo Crema"}
          >
            {theme === "cream" ? (
              <Moon size={18} strokeWidth={1.8} className="fill-current" />
            ) : (
              <Sun size={18} strokeWidth={1.8} className="text-current" />
            )}
          </button>
        </div>
      </nav>
    </header>
  );
}
