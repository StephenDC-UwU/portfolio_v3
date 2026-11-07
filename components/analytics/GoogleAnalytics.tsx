"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export default function GoogleAnalytics({
  measurementId,
}: {
  measurementId?: string;
}) {
  const gaId =
    measurementId ||
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ||
    "G-EVYJSDG5L2";
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (!gaId || !pathname || typeof window === "undefined") return;

    // Initial pageview is already recorded by the <head> gtag snippet
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (typeof window.gtag === "function") {
      window.gtag("config", gaId, {
        page_path: pathname,
      });
    }
  }, [pathname, gaId]);

  useEffect(() => {
    if (!gaId || typeof window === "undefined") return;

    const syncConsent = () => {
      const accepted = localStorage.getItem("consent-accepted") === "accepted";
      if (accepted && typeof window.gtag === "function") {
        window.gtag("consent", "update", {
          analytics_storage: "granted",
        });
      }
    };

    syncConsent();
    window.addEventListener("storage", syncConsent);
    window.addEventListener("consent-updated", syncConsent);
    return () => {
      window.removeEventListener("storage", syncConsent);
      window.removeEventListener("consent-updated", syncConsent);
    };
  }, [gaId]);

  return null;
}
