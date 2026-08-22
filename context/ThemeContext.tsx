"use client";

import React, { createContext, useContext, useEffect, useState, useTransition } from "react";

type Theme = "cream" | "crimson";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("cream");
  const [, startTransition] = useTransition();

  useEffect(() => {
    const saved = (typeof window !== "undefined" ? localStorage.getItem("portfolio_theme") : null) as Theme | null;
    if (saved === "crimson" || saved === "cream") {
      startTransition(() => {
        setThemeState(saved);
      });
      document.documentElement.setAttribute("data-theme", saved);
    } else {
      document.documentElement.setAttribute("data-theme", "cream");
    }
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    if (typeof window !== "undefined") {
      localStorage.setItem("portfolio_theme", newTheme);
      document.documentElement.setAttribute("data-theme", newTheme);
    }
  };

  const toggleTheme = () => {
    const next = theme === "cream" ? "crimson" : "cream";
    setTheme(next);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
