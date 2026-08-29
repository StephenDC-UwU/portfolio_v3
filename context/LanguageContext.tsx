"use client";

import React, { createContext, useContext, useState, useEffect, useTransition } from "react";

export type Language = "es" | "en";

export const translations = {
  es: {
    nav: {
      home: "Inicio",
      about: "Sobre Mí",
      projects: "Proyectos",
      contact: "Contacto",
      blog: "Blog",
    },
    hero: {
      headlinePart1: "ART",
      headlinePart2: "IS",
      headlinePart3: "EVERYWHERE",
      subtitle: "Dirección de arte, desarrollo creativo y experiencias digitales inmersivas.",
      ctaExplore: "Explorar Obras",
      ctaContact: "Contactar",
      scrollDown: "Desplaza para descubrir",
    },
    about: {
      tagline: "FILOSOFÍA",
      role: "Full Stack Developer",
      bio: "Para mí, programar es un arte donde la tecnología se complementa con la creatividad. Me especializo en dar vida a interfaces fluidas y arquitecturas robustas usando TypeScript como motor principal, buscando siempre soluciones escalables y experiencias memorables.",
      stackTitle: "Stack",
      title: "Forjando código y narrativa visual",
      p1: "Para mí, programar es un arte donde la tecnología se funde con la creatividad. Me especializo en dar vida a interfaces fluidas y arquitecturas robustas con TypeScript y React como motor principal.",
      p2: "Ya sea diseñando aplicaciones móviles, paneles interactivos o APIs escalables con Node.js y bases de datos modernas, miro siempre más allá del código para construir experiencias memorables.",
      quote: "“El arte y la programacion se complementan para generar algo magico”",
      skillsTitle: "Habilidades",
      experienceTitle: "Trayectoria",
      yearsExp: "Años de Experiencia",
      projectsCount: "Proyectos Completados",
      satisfaction: "Satisfacción Creativa",
    },
    projects: {
      tagline: "SELECCIÓN DE OBRAS",
      title: "Proyectos Destacados",
      filterAll: "Todos",
      filterCreative: "Creative Dev",
      filterApp: "Web Apps",
      filterDesign: "UI / Art",
      viewProject: "Ver Proyecto",
      sourceCode: "Código",
      items: [
        {
          id: "1",
          title: "Chrono & Blade — Experiencia 3D Inmersiva",
          category: "creative",
          categoryLabel: "Creative Dev",
          year: "2026",
          description:
            "Experiencia web interactiva con física de partículas, shaders personalizados en WebGL y transiciones cinemáticas fluidas con GSAP ScrollTrigger.",
          tags: ["GSAP", "Three.js", "Next.js", "WebGL"],
        },
        {
          id: "2",
          title: "Atelier Vanguard — Plataforma Editorial de Lujo",
          category: "apps",
          categoryLabel: "Web Apps",
          year: "2025",
          description:
            "Plataforma de comercio editorial de alta gama para colecciones de diseño, integrando animaciones de micro-interacción y rendimiento optimizado.",
          tags: ["React 19", "Tailwind CSS", "TypeScript", "GSAP"],
        },
        {
          id: "3",
          title: "Gothic Typo Lab — Motor Tipográfico Cinético",
          category: "design",
          categoryLabel: "UI / Art",
          year: "2025",
          description:
            "Herramienta interactiva para experimentar con deformación tipográfica procedural y renderizado vectorial de alta precisión.",
          tags: ["SVG Manipulation", "Canvas API", "GSAP Timeline"],
        },
        {
          id: "4",
          title: "Aura Audio Visualizer — Paisaje Sonoro Sinestésico",
          category: "creative",
          categoryLabel: "Creative Dev",
          year: "2024",
          description:
            "Visualizador de audio reactivo que traduce frecuencias sonoras en composiciones visuales orgánicas y mutables.",
          tags: ["Web Audio API", "GSAP", "Canvas"],
        },
      ],
    },
    contact: {
      tagline: "INICIAR UN DIÁLOGO",
      title: "Hagamos algo memorable",
      subtitle: "¿Tienes una visión audaz en mente o buscas elevar tu presencia digital? Escríbeme y demos vida al proyecto.",
      nameLabel: "Nombre Completo",
      namePlaceholder: "Ej. Alejandro Rossi",
      emailLabel: "Correo Electrónico",
      emailPlaceholder: "nombre@ejemplo.com",
      messageLabel: "Mensaje",
      messagePlaceholder: "Cuéntame sobre tu proyecto o idea...",
      submitBtn: "Enviar Mensaje",
      sending: "Enviando...",
      success: "¡Mensaje enviado con éxito!",
      socialsTitle: "Redes & Enlaces",
    },
    footer: {
      quote: "“El arte no es lo que ves, sino lo que haces ver a otros.”",
      rights: "Todos los derechos reservados.",
      backToTop: "Volver Arriba",
    },
    notFound: {
      code: "404",
      tagline: "SENDERO INEXISTENTE",
      title: "Extraviado en el Vacío",
      description: "La página o manuscrito que buscas se ha desvanecido o nunca existió en este plano digital.",
      backHome: "Regresar al Santuario",
    },
  },
  en: {
    nav: {
      home: "Home",
      about: "About Me",
      projects: "Projects",
      contact: "Contact",
      blog: "Blog",
    },
    hero: {
      headlinePart1: "ART",
      headlinePart2: "  IS",
      headlinePart3: "EVERYWHERE",
      subtitle: "Art direction, creative development, and immersive digital experiences.",
      ctaExplore: "Explore Works",
      ctaContact: "Get in Touch",
      scrollDown: "Scroll to discover",
    },
    about: {
      tagline: "PHILOSOPHY & APPROACH",
      role: "Full Stack Developer",
      bio: "For me, programming is an art where technology is complemented by creativity. I specialize in bringing fluid interfaces and robust architectures to life using TypeScript as my core engine, always striving for scalable architectures and memorable experiences.",
      stackTitle: "Stack",
      title: "Forging code and visual narrative",
      p1: "For me, programming is an art where technology merges with creativity. I specialize in crafting fluid interfaces and robust architectures with TypeScript and React as my core engine.",
      p2: "Whether designing mobile applications, interactive dashboards, or scalable APIs with Node.js and modern databases, I always look beyond the code to build memorable experiences.",
      quote: "“Programming is an art where technology comes alive through creativity and structure.”",
      skillsTitle: "Disciplines & Mastery",
      experienceTitle: "Journey",
      yearsExp: "Years Experience",
      projectsCount: "Completed Projects",
      satisfaction: "Creative Joy",
    },
    projects: {
      tagline: "CURATED WORKS",
      title: "Featured Projects",
      filterAll: "All",
      filterCreative: "Creative Dev",
      filterApp: "Web Apps",
      filterDesign: "UI / Art",
      viewProject: "View Project",
      sourceCode: "Source Code",
      items: [
        {
          id: "1",
          title: "Chrono & Blade — Immersive 3D Experience",
          category: "creative",
          categoryLabel: "Creative Dev",
          year: "2026",
          description:
            "Interactive web experience featuring particle physics, custom WebGL shaders, and fluid cinematic transitions with GSAP ScrollTrigger.",
          tags: ["GSAP", "Three.js", "Next.js", "WebGL"],
        },
        {
          id: "2",
          title: "Atelier Vanguard — Luxury Editorial Platform",
          category: "apps",
          categoryLabel: "Web Apps",
          year: "2025",
          description:
            "High-end editorial commerce platform for bespoke design collections, integrating fluid micro-interactions and optimal performance.",
          tags: ["React 19", "Tailwind CSS", "TypeScript", "GSAP"],
        },
        {
          id: "3",
          title: "Gothic Typo Lab — Kinetic Typography Engine",
          category: "design",
          categoryLabel: "UI / Art",
          year: "2025",
          description:
            "Interactive experimental tool for procedural typographic deformation and high-precision vector rendering.",
          tags: ["SVG Manipulation", "Canvas API", "GSAP Timeline"],
        },
        {
          id: "4",
          title: "Aura Audio Visualizer — Synesthetic Soundscape",
          category: "creative",
          categoryLabel: "Creative Dev",
          year: "2024",
          description:
            "Reactive audio visualizer translating sound frequencies into organic, mutable visual compositions.",
          tags: ["Web Audio API", "GSAP", "Canvas"],
        },
      ],
    },
    contact: {
      tagline: "INITIATE A DIALOGUE",
      title: "Let's craft something memorable",
      subtitle: "Have a bold vision in mind or looking to elevate your digital presence? Send a message and let's bring it to life.",
      nameLabel: "Full Name",
      namePlaceholder: "e.g. Alexander Vance",
      emailLabel: "Email Address",
      emailPlaceholder: "name@example.com",
      messageLabel: "Message",
      messagePlaceholder: "Tell me about your project or vision...",
      submitBtn: "Send Message",
      sending: "Sending...",
      success: "Message sent successfully!",
      socialsTitle: "Socials & Direct",
    },
    footer: {
      quote: "“Art is not what you see, but what you make others see.”",
      rights: "All rights reserved.",
      backToTop: "Back to Top",
    },
    notFound: {
      code: "404",
      tagline: "UNKNOWN REALM",
      title: "Lost in the Void",
      description: "The manuscript or page you seek has faded into shadows or does not exist in this realm.",
      backHome: "Return to Sanctuary",
    },
  },
};

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: typeof translations.es;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("es");
  const [, startTransition] = useTransition();

  useEffect(() => {
    const saved = (typeof window !== "undefined" ? localStorage.getItem("portfolio_lang") : null) as Language | null;
    if (saved === "es" || saved === "en") {
      startTransition(() => {
        setLangState(saved);
      });
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    if (typeof window !== "undefined") {
      localStorage.setItem("portfolio_lang", newLang);
    }
  };

  const toggleLang = () => {
    const next = lang === "es" ? "en" : "es";
    setLang(next);
  };

  return (
    <LanguageContext.Provider
      value={{
        lang,
        setLang,
        toggleLang,
        t: translations[lang],
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
