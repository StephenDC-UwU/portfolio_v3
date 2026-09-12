import { ProjectItem } from "@/types/ProjectItem";

export interface ProjectData extends Omit<
  ProjectItem,
  "title" | "description" | "categoryLabel"
> {
  translations: {
    es: {
      title: string;
      categoryLabel: string;
      description: string;
    };
    en: {
      title: string;
      categoryLabel: string;
      description: string;
    };
  };
}

export const rawProjects: ProjectData[] = [
  {
    id: "1",
    videoPath: "/videos/ecommerce-diversal.mp4",
    githubFrontend:
      "https://github.com/StephenDC-UwU/frontend-ecommerce_diversal",
    githubBackend:
      "https://github.com/StephenDC-UwU/backend-ecommerce_diversal",
    demoUrl: "https://frontend-ecommerce-diversal.vercel.app/",
    category: "apps",
    year: "2026",
    tags: ["Next.js", "Strapi", "PostgreSQL", "Cloudflare"],
    translations: {
      es: {
        title: "Diversal — Plataforma E-Commerce Full Stack",
        categoryLabel: "Web Apps",
        description:
          "Plataforma de comercio electrónico de alto rendimiento desarrollada con Next.js, backend headless con Strapi, base de datos PostgreSQL y gestión multimedia con Cloudflare.",
      },
      en: {
        title: "Diversal — Full Stack E-Commerce Platform",
        categoryLabel: "Web Apps",
        description:
          "High-performance e-commerce platform built with Next.js, headless backend powered by Strapi, PostgreSQL database, and Cloudflare for media storage.",
      },
    },
  },
  {
    id: "2",
    videoPath: "/videos/iaschedule.mp4",
    githubFrontend: "https://github.com/StephenDC-UwU/frontend_IAScheduleV2",
    githubBackend: "https://github.com/StephenDC-UwU/backend_IAScheduleV2",
    demoUrl: "https://frontend-ia-schedule-v2.vercel.app/",
    category: "apps",
    year: "2026",
    tags: ["Next.js", "Express", "MongoDB", "LLM / AI"],
    translations: {
      es: {
        title: "IA Schedule — Dashboard de Gestión con LLM",
        categoryLabel: "Web Apps",
        description:
          "Dashboard inteligente para la gestión de empleados con asistente LLM integrado, permitiendo interactuar y modificar planificaciones mediante lenguaje natural usando Next.js, Express y MongoDB.",
      },
      en: {
        title: "IA Schedule — AI & LLM Employee Dashboard",
        categoryLabel: "Web Apps",
        description:
          "Intelligent employee management dashboard featuring an integrated LLM assistant, enabling natural language schedule queries and modifications using Next.js, Express, and MongoDB.",
      },
    },
  },
  {
    id: "3",
    videoPath: "/videos/redesign-laquarium-barcelona.mp4",
    githubFrontend:
      "https://github.com/StephenDC-UwU/redesign-laquarium-barcelona",
    demoUrl: "https://redesign-laquarium-barcelona.vercel.app/",
    category: "creative",
    year: "2025",
    tags: ["Next.js", "GSAP", "Tailwind CSS", "Server Actions"],
    translations: {
      es: {
        title: "L'Aquàrium Barcelona — Rediseño & Arquitectura Monolítica",
        categoryLabel: "Creative Dev",
        description:
          "Rediseño interactivo construido bajo una arquitectura monolítica con Next.js y Server Actions, combinando animaciones fluidas en GSAP, Tailwind CSS y un backend unificado.",
      },
      en: {
        title: "L'Aquàrium Barcelona — Redesign & Monolithic Experience",
        categoryLabel: "Creative Dev",
        description:
          "Interactive web redesign built with a Next.js monolithic architecture and Server Actions, combining smooth GSAP animations, Tailwind CSS, and a unified backend.",
      },
    },
  },
  {
    id: "4",
    videoPath: "/videos/landing-homes.mp4",
    githubFrontend: "https://github.com/StephenDC-UwU/landpage_new_homes",
    demoUrl: "https://landpage-new-homes.vercel.app/",
    category: "design",
    year: "2025",
    tags: ["Astro", "Vanilla JS", "CSS3", "UI / UX"],
    translations: {
      es: {
        title: "Homes — Landing Page de Arquitectura & Real Estate",
        categoryLabel: "UI / Art",
        description:
          "Landing page inmobiliaria moderna y ultraligera desarrollada con Astro y Vanilla Web (HTML5, CSS3 y JS nativo), enfocada en máximo rendimiento, SEO y estética cuidada.",
      },
      en: {
        title: "Homes — Real Estate & Architecture Landing",
        categoryLabel: "UI / Art",
        description:
          "Ultra-fast, modern real estate landing page crafted with Astro and Vanilla Web (HTML5, CSS3, native JS), focusing on top-tier performance, SEO, and polished aesthetics.",
      },
    },
  },
];

/**
 * Returns the fully hydrated projects array with the localized texts for the given language.
 */
export function getProjectsByLang(lang: "es" | "en"): ProjectItem[] {
  return rawProjects.map((p) => {
    const translation = p.translations[lang] || p.translations.es;
    return {
      id: p.id,
      videoPath: p.videoPath,
      githubFrontend: p.githubFrontend,
      githubBackend: p.githubBackend,
      githubUrl: p.githubUrl,
      demoUrl: p.demoUrl,
      category: p.category,
      year: p.year,
      tags: p.tags,
      title: translation.title,
      categoryLabel: translation.categoryLabel,
      description: translation.description,
    };
  });
}
