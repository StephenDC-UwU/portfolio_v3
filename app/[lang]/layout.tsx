import localFont from "next/font/local";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "../globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { Toaster } from "@/components/ui/sonner";
import CookieConsent from "@/components/legal/CookieConsent";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
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
  const isEn = lang === "en";
  const dictionary = isEn ? EN : ES;

  return {
    title: {
      default: dictionary.seo.title,
      template: "%s | Sixto Uriarte (The Filimisco)",
    },
    description: dictionary.seo.description,
    keywords: dictionary.seo.keywords,
    authors: [{ name: "Sixto Steven Uriarte Moreira" }],
    creator: "Sixto Steven Uriarte Moreira (The Filimisco)",
    alternates: {
      languages: {
        es: "/es",
        en: "/en",
      },
    },
    openGraph: {
      title: dictionary.seo.title,
      description: dictionary.seo.description,
      siteName: "Sixto Uriarte — The Filimisco",
      locale: isEn ? "en_US" : "es_ES",
      alternateLocale: isEn ? ["es_ES"] : ["en_US"],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: dictionary.seo.title,
      description: dictionary.seo.description,
    },
    robots: {
      index: true,
      follow: true,
    },
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
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-EVYJSDG5L2";

  return (
    <html
      lang={lang || "es"}
      className={`${cormorant.variable} ${cinzel.variable} ${ebGaramond.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());
              gtag('config', '${gaId}');
            `,
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <LanguageProvider>
            {children}
            <CookieConsent />
          </LanguageProvider>
          <Analytics />
          <SpeedInsights />
          <GoogleAnalytics measurementId={gaId} />
          <Toaster position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
