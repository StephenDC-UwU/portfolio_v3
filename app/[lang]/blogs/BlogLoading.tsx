"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

interface BlogLoadingProps {
  fullScreen?: boolean;
}

export default function BlogLoading({ fullScreen = false }: BlogLoadingProps) {
  const { t } = useLanguage();

  return (
    <div
      role="status"
      aria-live="polite"
      className={`w-full flex flex-col items-center justify-center select-none ${fullScreen
        ? "min-h-screen bg-bg-primary text-text-primary px-6"
        : "min-h-[360px] sm:min-h-[420px] py-16 px-6 rounded-3xl bg-[#FAF6ED]/60 dark:bg-white/5 border border-current/10 backdrop-blur-sm"
        }`}
    >
      {/* Animated Editorial Emblem */}
      <div className="relative w-20 h-20 flex items-center justify-center mb-6">
        {/* Outer slow rotating dashed ring */}
        <span
          className="absolute inset-0 rounded-full border border-current/25 border-t-current animate-spin"
          style={{ animationDuration: "2.4s" }}
        />
        {/* Inner reverse rotating diamond */}
        {/*  <span
          className="w-9 h-9 rotate-45 border border-current/40 animate-pulse"
          style={{ animationDuration: "1.6s" }}
        /> */}
        {/* Center pulsing dot */}
        {/* <span className="w-2.5 h-2.5 rounded-full bg-current animate-ping" /> */}
      </div>

      {/* Animated Loading Text (ES: "Cargando..." / EN: "Loading...") */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-baseline gap-1 font-cinzel text-xl sm:text-2xl font-bold uppercase tracking-[0.25em]">
          <span className="animate-pulse">
            {t.blog.loadingText.replace(/\.+$/, "")}
          </span>
          <span className="inline-flex">
            <span
              className="animate-bounce inline-block"
              style={{ animationDelay: "0ms" }}
            >
              .
            </span>
            <span
              className="animate-bounce inline-block"
              style={{ animationDelay: "150ms" }}
            >
              .
            </span>
            <span
              className="animate-bounce inline-block"
              style={{ animationDelay: "300ms" }}
            >
              .
            </span>
          </span>
        </div>

        {/* <p className="font-editorial italic text-base sm:text-lg opacity-75 animate-pulse">
          {t.blog.loadingSubtext}
        </p> */}
      </div>
    </div>
  );
}

