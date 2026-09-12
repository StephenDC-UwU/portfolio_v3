"use client";

import React, { createContext, useContext, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ES } from "@/dictionaries/es";
import { EN } from "@/dictionaries/en";

export type Language = "es" | "en";

const translations = {
  es: ES,
  en: EN,
};

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: typeof translations.es;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  // Extract language from URL pathname (e.g. /en/blogs -> "en", /es/... -> "es")
  const segments = pathname ? pathname.split("/").filter(Boolean) : [];
  const currentLang: Language = segments[0] === "en" ? "en" : "es";

  // Keep cookie in sync with current URL language
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.cookie = `lang-selected=${currentLang};path=/;max-age=31536000;SameSite=Lax`;
    }
  }, [currentLang]);

  const setLang = (newLang: Language) => {
    if (newLang === currentLang) return;

    if (typeof document !== "undefined") {
      document.cookie = `lang-selected=${newLang};path=/;max-age=31536000;SameSite=Lax`;
    }

    if (!pathname) {
      router.push(`/${newLang}`);
      return;
    }

    // Replace locale prefix in the pathname
    let targetPath = pathname;
    if (segments.length > 0 && (segments[0] === "es" || segments[0] === "en")) {
      const rest = segments.slice(1).join("/");
      targetPath = `/${newLang}${rest ? `/${rest}` : ""}`;
    } else {
      targetPath = `/${newLang}${pathname.startsWith("/") ? pathname : `/${pathname}`}`;
    }

    router.push(targetPath);
  };

  const toggleLang = () => {
    setLang(currentLang === "es" ? "en" : "es");
  };

  return (
    <LanguageContext.Provider
      value={{
        lang: currentLang,
        setLang,
        toggleLang,
        t: translations[currentLang],
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
