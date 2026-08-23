import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { LanguageProvider } from "@/context/LanguageContext";

const cormorant = localFont({
  src: [
    {
      path: "../public/fonts/CormorantGaramond.ttf",
      style: "normal",
    },
    {
      path: "../public/fonts/CormorantGaramond-Italic.ttf",
      style: "italic",
    },
  ],
  variable: "--font-cormorant",
  display: "swap",
});

const cinzel = localFont({
  src: [
    {
      path: "../public/fonts/Cinzel.ttf",
      style: "normal",
    },
  ],
  variable: "--font-cinzel",
  display: "swap",
});

const ebGaramond = localFont({
  src: [
    {
      path: "../public/fonts/EBGaramond.ttf",
      style: "normal",
    },
    {
      path: "../public/fonts/EBGaramond-Italic.ttf",
      style: "italic",
    },
  ],
  variable: "--font-eb-garamond",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Filimisco - Portfolio",
  description: "A showcase of artistic direction, creative development, and digital craftsmanship.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${cormorant.variable} ${cinzel.variable} ${ebGaramond.variable} antialiased`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
