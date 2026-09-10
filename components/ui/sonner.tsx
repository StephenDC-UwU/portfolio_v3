"use client";

import { useTheme } from "@/context/ThemeContext";
import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme } = useTheme();

  return (
    <Sonner
      theme={theme === "crimson" ? "dark" : "light"}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--bg-primary)",
          "--normal-text": "var(--text-primary)",
          "--normal-border": "var(--card-border)",
          "--success-bg": "var(--bg-primary)",
          "--success-text": "var(--text-primary)",
          "--success-border": "var(--card-border)",
          "--error-bg": "var(--bg-primary)",
          "--error-text": "var(--text-primary)",
          "--error-border": "var(--card-border)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-[var(--bg-primary)] group-[.toaster]:text-[var(--text-primary)] group-[.toaster]:border group-[.toaster]:border-[var(--card-border)] group-[.toaster]:shadow-2xl group-[.toaster]:rounded-2xl backdrop-blur-xl",
          description:
            "group-[.toast]:text-[var(--text-secondary)] text-xs opacity-90",
          actionButton:
            "group-[.toast]:bg-[var(--text-primary)] group-[.toast]:text-[var(--bg-primary)] text-xs font-cinzel",
          cancelButton:
            "group-[.toast]:bg-current/10 group-[.toast]:text-[var(--text-primary)] text-xs font-cinzel",
          title: "text-sm font-cinzel tracking-wider font-semibold",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
export { toast } from "sonner";
