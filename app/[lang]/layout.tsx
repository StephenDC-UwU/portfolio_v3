import localFont from "next/font/local";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "../globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { Toaster } from "@/components/ui/sonner";
import CookieConsent from "@/components/legal/CookieConsent";
import { ES } from "@/dictionaries/es";
import { EN } from "@/dictionaries/en";

const cormorant = localFont({
  src: [
    {
      path: "../../public/fonts/CormorantGaramond.ttf",
      weight: "300 700",
      style: "normal",
    },
    {
      path: "../../public/fonts/CormorantGaramond-Italic.ttf",
      weight: "300 700",
      style: "italic",
    },
  ],
  variable: "--font-cormorant",
  display: "swap",
  adjustFontFallback: "Times New Roman",
  fallback: ["Cormorant Garamond", "Georgia", "serif"],
});

const cinzel = localFont({
  src: [
    {
      path: "../../public/fonts/Cinzel.ttf",
      weight: "400 900",
      style: "normal",
    },
  ],
  variable: "--font-cinzel",
  display: "swap",
  adjustFontFallback: "Times New Roman",
  fallback: ["Cinzel", "Georgia", "serif"],
});

const ebGaramond = localFont({
  src: [
    {
      path: "../../public/fonts/EBGaramond.ttf",
      weight: "400 800",
      style: "normal",
    },
    {
      path: "../../public/fonts/EBGaramond-Italic.ttf",
      weight: "400 800",
      style: "italic",
    },
  ],
  variable: "--font-eb-garamond",
  display: "swap",
  preload: false,
  adjustFontFallback: "Times New Roman",
  fallback: ["EB Garamond", "Georgia", "serif"],
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dictionary = lang === "en" ? EN : ES;

  return {
    title: dictionary.seo.title,
    description: dictionary.seo.description,
  };
}

export async function generateStaticParams() {
  return [{ lang: "es" }, { lang: "en" }];
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;

  return (
    <html
      lang={lang || "es"}
      className={`${cormorant.variable} ${cinzel.variable} ${ebGaramond.variable} antialiased`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider>
          <LanguageProvider>
            {children}
            <CookieConsent />
          </LanguageProvider>
          <Analytics />
          <SpeedInsights />
          <Toaster position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
