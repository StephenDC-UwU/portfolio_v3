"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export default function GoogleAnalytics() {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const pathname = usePathname();

  useEffect(() => {
    if (!measurementId || !pathname || typeof window === "undefined") return;

    if (typeof window.gtag === "function") {
      window.gtag("config", measurementId, {
        page_path: pathname,
      });
    }
  }, [pathname, measurementId]);

  useEffect(() => {
    if (!measurementId || typeof window === "undefined") return;

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
  }, [measurementId]);

  if (!measurementId) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${measurementId}', {
            page_path: window.location.pathname,
            anonymize_ip: true
          });
        `}
      </Script>
    </>
  );
}

