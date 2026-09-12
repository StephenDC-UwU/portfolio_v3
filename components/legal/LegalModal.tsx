"use client";

import React, { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Cookie, ShieldCheck, Scale, X, Sparkles, CheckCircle2 } from "lucide-react";

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: "cookies" | "privacy" | "legal";
}

export default function LegalModal({
  isOpen,
  onClose,
  defaultTab = "cookies",
}: LegalModalProps) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<"cookies" | "privacy" | "legal">(defaultTab);

  useEffect(() => {
    if (defaultTab) {
      setActiveTab(defaultTab);
    }
  }, [defaultTab, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const tabs = [
    { id: "cookies", label: t.legal.tabs.cookies, icon: Cookie },
    { id: "privacy", label: t.legal.tabs.privacy, icon: ShieldCheck },
    { id: "legal", label: t.legal.tabs.legalNotice, icon: Scale },
  ] as const;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 md:p-10 select-none">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div
        className="relative w-full max-w-3xl max-h-[88vh] flex flex-col rounded-3xl bg-bg-primary text-text-primary border border-current/15 shadow-[0_25px_60px_rgba(0,0,0,0.5)] z-10 overflow-hidden animate-in fade-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-current/10 bg-current/5">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-current/10 text-current">
              <Sparkles size={18} />
            </div>
            <div>
              <h2 className="font-cinzel text-lg sm:text-xl font-bold tracking-wide">
                {t.legal.modalTitle}
              </h2>
              <p className="text-xs opacity-70 font-sans-clean">
                {t.legal.modalSubtitle}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-current/10 transition-colors text-current/70 hover:text-current cursor-pointer"
            aria-label={t.legal.closeBtn}
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 px-6 sm:px-8 pt-4 pb-2 border-b border-current/10 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-cinzel tracking-wider uppercase transition-all duration-200 cursor-pointer whitespace-nowrap ${isActive
                    ? "bg-current text-white dark:text-black font-bold shadow-md scale-[1.02]"
                    : "opacity-70 hover:opacity-100 hover:bg-current/5"
                  }`}
                style={{
                  backgroundColor: isActive ? "var(--text-primary)" : "transparent",
                  color: isActive ? "var(--bg-primary)" : "var(--text-primary)",
                }}
              >
                <Icon size={15} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Body (Scrollable) */}
        <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-6 space-y-6 text-sm leading-relaxed font-sans-clean">
          {/* TAB 1: COOKIES */}
          {activeTab === "cookies" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="space-y-2">
                <h3 className="font-editorial text-2xl font-bold text-current">
                  {t.legal.cookiesSection.title}
                </h3>
                <p className="opacity-80">
                  {t.legal.cookiesSection.p1}
                </p>
              </div>

              {/* Table of Cookies */}
              <div className="rounded-2xl border border-current/15 overflow-hidden">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-current/10 border-b border-current/10 font-cinzel text-[11px] tracking-wider uppercase opacity-90">
                      <th className="p-3 sm:p-4">{t.legal.cookiesSection.tableHeaderCookie}</th>
                      <th className="p-3 sm:p-4">{t.legal.cookiesSection.tableHeaderPurpose}</th>
                      <th className="p-3 sm:p-4">{t.legal.cookiesSection.tableHeaderDuration}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-current/10">
                    {t.legal.cookiesSection.items.map((item, idx) => (
                      <tr key={idx} className="hover:bg-current/5 transition-colors">
                        <td className="p-3 sm:p-4 font-mono font-bold text-accent">
                          {item.name}
                        </td>
                        <td className="p-3 sm:p-4 opacity-85">
                          {item.purpose}
                        </td>
                        <td className="p-3 sm:p-4 opacity-75 font-mono text-[11px] whitespace-nowrap">
                          {item.duration}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-4 rounded-xl bg-current/5 border border-current/10 text-xs opacity-75 italic">
                {t.legal.cookiesSection.footnote}
              </div>
            </div>
          )}

          {/* TAB 2: PRIVACY */}
          {activeTab === "privacy" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="space-y-2">
                <h3 className="font-editorial text-2xl font-bold text-current">
                  {t.legal.privacySection.title}
                </h3>
                <p className="opacity-85">
                  {t.legal.privacySection.p1}
                </p>
                <p className="opacity-85">
                  {t.legal.privacySection.p2}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-current/5 border border-current/10 space-y-2">
                <div className="flex items-center gap-2 font-cinzel text-xs font-bold uppercase tracking-wider text-accent">
                  <CheckCircle2 size={16} />
                  <span>{t.legal.privacySection.rightsTitle}</span>
                </div>
                <p className="opacity-80 text-xs sm:text-sm">
                  {t.legal.privacySection.rightsText}
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: LEGAL NOTICE */}
          {activeTab === "legal" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="space-y-3">
                <h3 className="font-editorial text-2xl font-bold text-current">
                  {t.legal.legalSection.title}
                </h3>
                <p className="opacity-85">
                  {t.legal.legalSection.p1}
                </p>
                <p className="opacity-85">
                  {t.legal.legalSection.p2}
                </p>
                <p className="opacity-85">
                  {t.legal.legalSection.p3}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer CTA */}
        <div className="px-6 sm:px-8 py-4 border-t border-current/10 bg-current/5 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full text-xs font-cinzel uppercase tracking-wider font-semibold shadow-md transition-all hover:scale-105 cursor-pointer"
            style={{
              backgroundColor: "var(--text-primary)",
              color: "var(--bg-primary)",
            }}
          >
            {t.legal.closeBtn}
          </button>
        </div>
      </div>
    </div>
  );
}
