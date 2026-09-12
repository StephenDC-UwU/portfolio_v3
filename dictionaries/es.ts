import {
  Code2,
  Database,
  GitBranch,
  Palette,
  Sparkles,
  Terminal,
} from "lucide-react";
import { getProjectsByLang } from "@/data/projects";

export const ES = {
  seo: {
    title: "The Filimisco - Portfolio",
    description: "Portfolio of Sixto Steven Uriarte Moreira",
  },
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
      {
        name: "MongoDB & SQL Databases",
        icon: Database,
        level: "Base de Datos",
      },
      { name: "Tailwind CSS & UI Design", icon: Palette, level: "Diseño & UI" },
      {
        name: "State (Redux / Zustand)",
        icon: Sparkles,
        level: "Estado",
      },
      {
        name: "Docker, Git & Testing",
        icon: GitBranch,
        level: "DevOps & Tools",
      },
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
    previewLoading: "Cargando...",
    previewActive: "Preview",
    githubTooltipMulti: "Repositorios de GitHub (Frontend & Backend)",
    githubTooltipSingle: "Repositorio de GitHub",
    githubAriaMulti: "Repositorios de GitHub",
    githubAriaSingle: "Repositorio de GitHub",
    repositoriesHeader: "Repositorios",
    frontendRepo: "Frontend",
    backendRepo: "Backend",
    items: getProjectsByLang("es"),
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
    tagline: "El Arte Está en Todos Lados",
    portfolioLabel: "Portafolio",
    titlePart1: "Creemos Algo",
    titlePart2: "Memorable.",
    quote: "“El arte no es lo que ves, sino lo que haces ver a otros.”",
    rights: "Todos los derechos reservados.",
    backToTop: "Volver Arriba",
    devotion: "Diseñado con devoción y código creativo",
  },
  notFound: {
    code: "404",
    tagline: "SENDERO INEXISTENTE",
    title: "Extraviado en el Vacío",
    description:
      "La página o manuscrito que buscas se ha desvanecido o nunca existió en este plano digital.",
    backHome: "Regresar al Santuario",
  },
  blog: {
    seoTitle: "Bitácora & Artículos | The Filimisco",
    seoDescription:
      "Pensamientos, crónicas y experimentos sobre desarrollo creativo, Vibe Coding, arquitectura web y arte digital.",
    heroTitlePart1: "VIBE CODE",
    heroTitlePart2: "IS REAL",
    heroSubtitle:
      "Pensamientos, crónicas y experimentos sobre desarrollo, arte y código.",
    searchPlaceholder: "Buscar artículos, tecnologías o conceptos...",
    filterTitle: "Filtros",
    categoriesLabel: "Categorías",
    categories: [
      { id: "all", label: "Todos los Artículos" },
      { id: "vibe-coding", label: "Vibe Coding" },
      { id: "creative-dev", label: "Creative Dev" },
      { id: "full-stack", label: "Full Stack" },
      { id: "art-code", label: "UI & Arte" },
    ],
    readMore: "Ver más",
    noArticles: "No se encontraron crónicas o artículos para tu búsqueda.",
    resetFilters: "Restablecer filtros",
    manifestoTitle: "The Vibe Manifest",
    manifestoQuote:
      "“El código bien forjado es como la poesía: invisible para quien lo ejecuta, pero transformador para quien lo experimenta.”",
  },
  legal: {
    bannerTagline: "PRIVACIDAD & PREFERENCIAS",
    bannerTitle: "Uso de Almacenamiento & Cookies",
    bannerDescription:
      "Este santuario digital utiliza cookies esenciales y almacenamiento local exclusivamente para recordar tu preferencia de idioma y tema visual (claro/oscuro). No empleamos cookies de rastreo publicitario.",
    acceptBtn: "Aceptar",
    configureBtn: "Políticas & Detalles",
    closeBtn: "Cerrar",

    modalTitle: "Transparencia Legal & Privacidad",
    modalSubtitle:
      "Conoce cómo protegemos tu experiencia y datos en este espacio.",
    tabs: {
      cookies: "Cookies",
      privacy: "Privacidad",
      legalNotice: "Aviso Legal",
    },

    cookiesSection: {
      title: "Política de Cookies Técnicas",
      p1: "Este sitio web utiliza cookies técnicas indispensables para garantizar el correcto funcionamiento y la personalización de tu navegación. No utilizamos cookies de terceros con fines publicitarios ni de seguimiento comercial.",
      tableHeaderCookie: "Cookie / Clave",
      tableHeaderPurpose: "Propósito",
      tableHeaderDuration: "Duración",
      items: [
        {
          name: "lang-selected",
          purpose:
            "Almacena tu preferencia de idioma (Español o Inglés) detectada desde tu navegador o seleccionada manualmente.",
          duration: "1 año (Cookie)",
        },
        {
          name: "theme-selected",
          purpose:
            "Guarda tu preferencia de estilo visual (Tema Crema o Crimson) para mantenerlo en futuras visitas.",
          duration: "Persistente (LocalStorage)",
        },
        {
          name: "consent-accepted",
          purpose:
            "Registra la confirmación de lectura y aceptación de esta política de privacidad.",
          duration: "1 año (LocalStorage)",
        },
      ],
      footnote:
        "Puedes limpiar o bloquear estas claves en cualquier momento desde las opciones de configuración de privacidad de tu navegador web.",
    },

    privacySection: {
      title: "Política de Privacidad y Tratamiento de Datos",
      p1: "La privacidad es un pilar fundamental en este portfolio. La información recopilada a través del formulario de contacto (nombre, correo electrónico y mensaje) se utiliza única y exclusivamente para responder a tus consultas profesionales.",
      p2: "Bajo ninguna circunstancia tus datos serán vendidos, cedidos, transferidos ni compartidos con empresas externas o plataformas de marketing.",
      rightsTitle: "Tus Derechos",
      rightsText:
        "Tienes derecho a solicitar la rectificación o eliminación total de cualquier mensaje o dato de contacto enviado escribiendo directamente a través de los canales de comunicación oficiales.",
    },

    legalSection: {
      title: "Aviso Legal y Propiedad Intelectual",
      p1: "El presente sitio web es un portfolio profesional y obra de desarrollo creativo perteneciente a Sixto Steven Uriarte Moreira (The Filimisco).",
      p2: "Todos los diseños, código fuente, animaciones, logotipos, redacciones y recursos multimedia presentes en este sitio están protegidos por leyes de derechos de autor y propiedad intelectual.",
      p3: "Las marcas y tecnologías mencionadas (React, Next.js, etc.) son propiedad de sus respectivos autores y se citan únicamente con fines ilustrativos y de atribución técnica.",
    },

    footerLink: "Aviso Legal & Privacidad",
  },
};
