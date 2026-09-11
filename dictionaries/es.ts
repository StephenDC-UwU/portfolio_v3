import { Code2, Database, Palette, Terminal } from "lucide-react";

export const ES = {
  nav: {
    home: "Inicio",
    about: "Sobre Mí",
    projects: "Proyectos",
    contact: "Contacto",
    blog: "Blog",
  },
  hero: {
    headlinePart1: "ARTE",
    headlinePart2: "IS",
    headlinePart3: "EVERYWHERE",
    subtitle:
      "Dirección de arte, desarrollo creativo y experiencias digitales inmersivas.",
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
    quote:
      "“El arte y la programacion se complementan para generar algo magico”",
    skillsTitle: "Habilidades",
    experienceTitle: "Trayectoria",
    yearsExp: "Años de Experiencia",
    projectsCount: "Proyectos Completados",
    satisfaction: "Satisfacción Creativa",
    skills: [
      { name: "React, Next.js & TypeScript", icon: Code2, level: "Frontend" },
      {
        name: "Node.js, Express & REST APIs",
        icon: Terminal,
        level: "Backend",
      },
      { name: "MongoDB & SQL Databases", icon: Database, level: "Database" },
      { name: "Tailwind CSS & UI Design", icon: Palette, level: "Styling" },
    ],
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
        videoPath: "/videos/ecommerce-diversal.mp4",
        title: "Diversal — Plataforma E-Commerce Full Stack",
        category: "apps",
        categoryLabel: "Web Apps",
        year: "2026",
        description:
          "Plataforma de comercio electrónico de alto rendimiento desarrollada con Next.js, backend headless con Strapi, base de datos PostgreSQL y gestión multimedia con Cloudflare.",
        tags: ["Next.js", "Strapi", "PostgreSQL", "Cloudflare"],
      },
      {
        id: "2",
        videoPath: "/videos/iaschedule.mp4",
        title: "IA Schedule — Dashboard de Gestión con LLM",
        category: "apps",
        categoryLabel: "Web Apps",
        year: "2026",
        description:
          "Dashboard inteligente para la gestión de empleados con asistente LLM integrado, permitiendo interactuar y modificar planificaciones mediante lenguaje natural usando Next.js, Express y MongoDB.",
        tags: ["Next.js", "Express", "MongoDB", "LLM / AI"],
      },
      {
        id: "3",
        videoPath: "/videos/redesign-laquarium-barcelona.mp4",
        title: "L'Aquàrium Barcelona — Rediseño & Arquitectura Monolítica",
        category: "creative",
        categoryLabel: "Creative Dev",
        year: "2025",
        description:
          "Rediseño interactivo construido bajo una arquitectura monolítica con Next.js y Server Actions, combinando animaciones fluidas en GSAP, Tailwind CSS y un backend unificado.",
        tags: ["Next.js", "GSAP", "Tailwind CSS", "Server Actions"],
      },
      {
        id: "4",
        videoPath: "/videos/landing-homes.mp4",
        title: "Homes — Landing Page de Arquitectura & Real Estate",
        category: "design",
        categoryLabel: "UI / Art",
        year: "2025",
        description:
          "Landing page inmobiliaria moderna y ultraligera desarrollada con Astro y Vanilla Web (HTML5, CSS3 y JS nativo), enfocada en máximo rendimiento, SEO y estética cuidada.",
        tags: ["Astro", "Vanilla JS", "CSS3", "UI / UX"],
      },
    ],
  },
  contact: {
    tagline: "INICIAR UN DIÁLOGO",
    title: "Hagamos algo memorable",
    subtitle:
      "¿Tienes una visión audaz en mente o buscas elevar tu presencia digital? Escríbeme y demos vida al proyecto.",
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
    description:
      "La página o manuscrito que buscas se ha desvanecido o nunca existió en este plano digital.",
    backHome: "Regresar al Santuario",
  },
};
