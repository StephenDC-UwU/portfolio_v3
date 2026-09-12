"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import {
  Home,
  User,
  LayoutGrid,
  Mail,
  ChevronDown,
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import LanguageDropdown from "@/components/navbar/LanguageDropdown";
import ThemeToggleButton from "@/components/navbar/ThemeToggleButton";


export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const { lang, t } = useLanguage();

  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  const navRef = useRef<HTMLDivElement>(null);
  const langMenuRef = useRef<HTMLDivElement>(null);
  const isClickScrollingRef = useRef(false);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isHome = pathname === `/${lang}` || pathname === `/${lang}/`;

  // Scroll spy synchronized with GSAP ScrollTrigger pinned panels
  useEffect(() => {
    if (!isHome) return;

    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    const sectionIds = ["hero", "about", "projects", "contact"];
    const triggers: ScrollTrigger[] = [];

    const timeout = setTimeout(() => {
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;

        const panel = el.closest(".panel-section") || el;

        const trigger = ScrollTrigger.create({
          trigger: panel,
          start: "top center",
          end: id === "contact" ? "bottom bottom" : "bottom center",
          onToggle: (self) => {
            if (self.isActive && !isClickScrollingRef.current) {
              setActiveSection(id);
            }
          },
        });

        triggers.push(trigger);
      });
    }, 150);

    return () => {
      clearTimeout(timeout);
      triggers.forEach((t) => t.kill());
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    };
  }, [pathname, isHome]);

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
    { id: "hero", label: t.nav.home, icon: Home, href: `/${lang}#hero`, isRoute: false },
    { id: "about", label: t.nav.about, icon: User, href: `/${lang}#about`, isRoute: false },
    { id: "projects", label: t.nav.projects, icon: LayoutGrid, href: `/${lang}#projects`, isRoute: false },
    { id: "contact", label: t.nav.contact, icon: Mail, href: `/${lang}#contact`, isRoute: false },
    /*  { id: "blog", label: t.nav.blog, icon: BookOpen, href: `/${lang}/blogs`, isRoute: true }, */
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string, href: string) => {
    e.preventDefault();
    setActiveSection(id);
    isClickScrollingRef.current = true;

    if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);

    const target = document.querySelector(href);
    if (!target) return;

    const panel = target.closest(".panel-section") || target;
    const allPanels = Array.from(document.querySelectorAll<HTMLElement>(".panel-section"));
    const panelIndex = allPanels.indexOf(panel as HTMLElement);

    let targetScroll = 0;
    if (panelIndex > 0) {
      for (let i = 0; i < panelIndex; i++) {
        targetScroll += allPanels[i].offsetHeight;
      }
    } else {
      targetScroll = 0;
    }

    gsap.to(window, {
      scrollTo: { y: targetScroll, autoKill: false },
      duration: 0.45,
      ease: "power2.out",
      onComplete: () => {
        isClickScrollingRef.current = false;
      },
    });

    clickTimeoutRef.current = setTimeout(() => {
      isClickScrollingRef.current = false;
    }, 500);
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    item: (typeof navItems)[number]
  ) => {
    if (item.isRoute) {
      e.preventDefault();
      router.push(item.href);
      return;
    }

    if (!isHome) {
      e.preventDefault();
      router.push(`/${lang}#${item.id}`);
      return;
    }

    scrollToSection(e, item.id, `#${item.id}`);
  };

  const isItemActive = (item: (typeof navItems)[number]) => {
    if (item.isRoute) {
      return pathname === item.href || pathname?.startsWith(item.href + "/");
    }
    return isHome && activeSection === item.id;
  };

  return (
    <header className="fixed bottom-4 md:top-6 md:bottom-auto left-0 right-0 z-50 flex justify-center px-4 pointer-events-none slide-in-blurred-top">
      <nav
        ref={navRef}
        className="pointer-events-auto flex items-center justify-between gap-2 sm:gap-6 px-3 sm:px-6 py-2 sm:py-2.5 rounded-2xl sm:rounded-full glass-nav transition-all duration-300 shadow-xl"
      >
        {/* Navigation Links with Icons & Labels */}
        <div className="flex items-center gap-1 sm:gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = isItemActive(item);
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item)}
                aria-current={isActive ? "page" : undefined}
                className={`group relative flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${isActive
                  ? "bg-accent text-bg-primary shadow-md font-medium scale-[1.02]"
                  : "text-text-primary/70 hover:text-text-primary hover:bg-black/5 dark:hover:bg-white/5"
                  }`}
              >
                <Icon
                  size={18}
                  strokeWidth={isActive ? 2 : 1.5}
                  className="transition-transform duration-200 group-hover:scale-110 shrink-0"
                />
                <span
                  className={`hidden md:block text-[11px] sm:text-xs font-cinzel tracking-wider capitalize whitespace-nowrap transition-all duration-300 `}
                >
                  {item.label}
                </span>
              </a>
            );
          })}
        </div>

        {/* Separator Line */}
        <div className="h-6 w-px bg-current opacity-20 hidden xs:block" />

        {/* Controls: Language Dropdown & Theme Toggle */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Language Selector */}
          <div className="relative" ref={langMenuRef}>
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-1 text-xs font-cinzel tracking-wider px-2 py-1 rounded-lg opacity-80 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
              aria-label="Toggle language"
            >
              <span>{lang.toUpperCase()}</span>
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${langMenuOpen ? "rotate-180" : ""
                  }`}
              />
            </button>

            {/* Dropdown Menu */}
            {langMenuOpen && (
              <LanguageDropdown
                setLangMenuOpen={setLangMenuOpen}
                lang={lang}
              />
            )}
          </div>

          {/* Theme Toggle Button */}
          <ThemeToggleButton
            toggleTheme={toggleTheme}
            theme={theme}
          />
        </div>
      </nav>
    </header>
  );
}
