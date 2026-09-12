"use client";

import React, { useEffect, useState, useSyncExternalStore } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Cookie, X } from "lucide-react";
import LegalModal from "./LegalModal";

export default function CookieConsent() {
  const { t } = useLanguage();
  const [isAcceptedLocally, setIsAcceptedLocally] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalDefaultTab, setModalDefaultTab] = useState<"cookies" | "privacy" | "legal">("cookies");

  const isConsentStored = useSyncExternalStore(
    (callback) => {
      window.addEventListener("storage", callback);
      return () => window.removeEventListener("storage", callback);
    },
    () => localStorage.getItem("consent-accepted") === "accepted",
    () => true
  );

  const hasConsent = isConsentStored || isAcceptedLocally;

  useEffect(() => {
    // Global listener to open legal modal from footer or links
    const handleOpenLegalModal = (e: CustomEvent<{ tab?: "cookies" | "privacy" | "legal" }>) => {
      if (e.detail?.tab) {
        setModalDefaultTab(e.detail.tab);
      }
      setIsModalOpen(true);
    };

    window.addEventListener("open-legal-modal", handleOpenLegalModal as EventListener);
    return () => {
      window.removeEventListener("open-legal-modal", handleOpenLegalModal as EventListener);
    };
  }, []);

  const handleAccept = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("consent-accepted", "accepted");
    }
    setIsAcceptedLocally(true);
  };

  const handleOpenDetails = () => {
    setModalDefaultTab("cookies");
    setIsModalOpen(true);
  };

  return (
    <>
      {/* Floating Bottom Banner (Only when consent is not yet given) */}
      {hasConsent === false && (
        <aside
          role="region"
          aria-label={t.legal.bannerTitle}
          className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 left-4 sm:left-auto max-w-lg z-[990] p-5 sm:p-6 rounded-3xl bg-bg-primary/95 text-text-primary border border-current/20 shadow-[0_20px_50px_rgba(0,0,0,0.4)] backdrop-blur-xl animate-in slide-in-from-bottom-8 fade-in duration-500 select-none"
        >
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-current/10 text-current shrink-0">
                  <Cookie size={18} />
                </div>
                <div>
                  <span className="text-[10px] font-cinzel font-semibold tracking-widest uppercase opacity-70 block">
                    {t.legal.bannerTagline}
                  </span>
                  <h3 className="font-cinzel text-sm sm:text-base font-bold leading-tight">
                    {t.legal.bannerTitle}
                  </h3>
                </div>
              </div>

              <button
                onClick={handleAccept}
                className="p-1.5 rounded-full hover:bg-current/10 text-current/60 hover:text-current transition-colors cursor-pointer"
                aria-label={t.legal.closeBtn}
              >
                <X size={16} />
              </button>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-[13px] opacity-80 leading-relaxed font-sans-clean font-light">
              {t.legal.bannerDescription}
            </p>

            {/* Actions */}
            <div className="flex items-center justify-end gap-2.5 pt-1">
              <button
                onClick={handleOpenDetails}
                className="px-3.5 py-2 rounded-xl text-xs font-cinzel uppercase tracking-wider opacity-75 hover:opacity-100 hover:bg-current/5 transition-all cursor-pointer"
              >
                {t.legal.configureBtn}
              </button>

              <button
                onClick={handleAccept}
                className="px-5 py-2 rounded-xl text-xs font-cinzel uppercase tracking-wider font-semibold shadow-md hover:scale-105 transition-all cursor-pointer"
                style={{
                  backgroundColor: "var(--text-primary)",
                  color: "var(--bg-primary)",
                }}
              >
                {t.legal.acceptBtn}
              </button>
            </div>
          </div>
        </aside>
      )}

      {/* Full Transparency Modal */}
      <LegalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultTab={modalDefaultTab}
      />
    </>
  );
}
