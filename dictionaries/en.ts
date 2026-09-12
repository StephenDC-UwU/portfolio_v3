import {
  Code2,
  Database,
  GitBranch,
  Palette,
  Sparkles,
  Terminal,
} from "lucide-react";
import { getProjectsByLang } from "@/data/projects";

export const EN = {
  seo: {
    title: "The Filimisco - Portfolio",
    description: "Portfolio of Sixto Steven Uriarte Moreira",
  },
  nav: {
    home: "Home",
    about: "About",
    projects: "Projects",
    contact: "Contact",
    blog: "Blog",
  },
  hero: {
    headlinePart1: "ART",
    headlinePart2: "IS",
    headlinePart3: "EVERYWHERE",
    subtitle:
      "Art direction, creative engineering, and immersive digital experiences.",
    ctaExplore: "Explore Works",
    ctaContact: "Get in Touch",
    scrollDown: "Scroll to discover",
  },
  about: {
    tagline: "PHILOSOPHY",
    role: "Full Stack Developer",
    bio: "For me, programming is an art where technology complements creativity. I specialize in bringing fluid interfaces and robust architectures to life with TypeScript as my primary engine, always striving for scalable solutions and memorable experiences.",
    stackTitle: "Stack",
    title: "Forging Code and Visual Narrative",
    p1: "For me, programming is an art where technology merges with creativity. I specialize in bringing fluid interfaces and robust architectures to life with TypeScript and React as my core engine.",
    p2: "Whether designing mobile apps, interactive dashboards, or scalable APIs with Node.js and modern databases, I always look beyond the code to build memorable experiences.",
    quote:
      "“Art and programming complement each other to create something magical”",
    skillsTitle: "Skills",
    experienceTitle: "Journey",
    yearsExp: "Years of Experience",
    projectsCount: "Projects Completed",
    satisfaction: "Creative Dedication",
    skills: [
      { name: "React, Next.js & TypeScript", icon: Code2, level: "Frontend" },
      {
        name: "Node.js, Express & REST APIs",
        icon: Terminal,
        level: "Backend",
      },
      { name: "MongoDB & SQL Databases", icon: Database, level: "Database" },
      { name: "Tailwind CSS & UI Design", icon: Palette, level: "UI & Design" },
      {
        name: "State (Redux / Zustand)",
        icon: Sparkles,
        level: "State",
      },
      {
        name: "Docker, Git & Testing",
        icon: GitBranch,
        level: "DevOps & Tools",
      },
    ],
  },
  projects: {
    tagline: "CURATED WORKS",
    title: "Featured Projects",
    filterAll: "All",
    filterCreative: "Creative Dev",
    filterApp: "Web Apps",
    filterDesign: "UI / Art",
    viewProject: "View Project",
    sourceCode: "Code",
    previewLoading: "Loading...",
    previewActive: "Preview",
    githubTooltipMulti: "GitHub Repositories (Frontend & Backend)",
    githubTooltipSingle: "GitHub Repository",
    githubAriaMulti: "GitHub Repositories",
    githubAriaSingle: "GitHub Repository",
    repositoriesHeader: "Repositories",
    frontendRepo: "Frontend",
    backendRepo: "Backend",
    items: getProjectsByLang("en"),
  },
  contact: {
    tagline: "START A DIALOGUE",
    title: "Let's Create Something Memorable",
    subtitle:
      "Have a bold vision in mind or looking to elevate your digital presence? Reach out and let's bring the project to life.",
    nameLabel: "Full Name",
    namePlaceholder: "e.g. Alexander Vance",
    emailLabel: "Email Address",
    emailPlaceholder: "name@example.com",
    messageLabel: "Message",
    messagePlaceholder: "Tell me about your project or idea...",
    submitBtn: "Send Message",
    sending: "Sending...",
    success: "Message sent successfully!",
    socialsTitle: "Connect & Socials",
  },
  footer: {
    tagline: "Art Is Everywhere",
    portfolioLabel: "Portfolio",
    titlePart1: "Let’s Create",
    titlePart2: "Something Epic.",
    quote: "“Art is not what you see, but what you make others see.”",
    rights: "All rights reserved.",
    backToTop: "Back to Top",
    devotion: "Designed with devotion & creative code",
  },
  notFound: {
    code: "404",
    tagline: "PATHWAY UNFOUND",
    title: "Lost in the Void",
    description:
      "The page or manuscript you seek has faded away or never existed in this digital realm.",
    backHome: "Return to Sanctuary",
  },
  blog: {
    seoTitle: "Blog & Articles | The Filimisco",
    seoDescription:
      "Thoughts, chronicles, and experiments on creative development, Vibe Coding, web architecture, and digital craftsmanship.",
    heroTitlePart1: "VIBE CODE",
    heroTitlePart2: "IS REAL",
    heroSubtitle:
      "Thoughts, chronicles, and experiments on development, art, and code.",
    searchPlaceholder: "Search articles, technologies, or concepts...",
    filterTitle: "Filters",
    categoriesLabel: "Categories",
    categories: [
      { id: "all", label: "All Articles" },
      { id: "vibe-coding", label: "Vibe Coding" },
      { id: "creative-dev", label: "Creative Dev" },
      { id: "full-stack", label: "Full Stack" },
      { id: "art-code", label: "UI & Art" },
    ],
    readMore: "Read more",
    noArticles: "No articles or chronicles were found matching your search.",
    resetFilters: "Reset filters",
    manifestoTitle: "The Vibe Manifest",
    manifestoQuote:
      "“Well-crafted code is like poetry: invisible to those who run it, but transformative to those who experience it.”",
  },
  legal: {
    bannerTagline: "PRIVACY & PREFERENCES",
    bannerTitle: "Storage & Cookie Preferences",
    bannerDescription:
      "This digital sanctuary uses essential cookies and local storage exclusively to preserve your language selection and visual theme (dark/light). We do not use third-party tracking or advertising cookies.",
    acceptBtn: "Accept",
    configureBtn: "Policies & Details",
    closeBtn: "Close",

    modalTitle: "Legal Transparency & Privacy",
    modalSubtitle:
      "Understand how we protect your experience and data in this realm.",
    tabs: {
      cookies: "Cookies",
      privacy: "Privacy",
      legalNotice: "Legal Notice",
    },

    cookiesSection: {
      title: "Technical Cookies Policy",
      p1: "This website uses essential technical cookies to ensure optimal functionality and seamless customization. We do not deploy third-party cookies for advertising or commercial tracking purposes.",
      tableHeaderCookie: "Cookie / Key",
      tableHeaderPurpose: "Purpose",
      tableHeaderDuration: "Duration",
      items: [
        {
          name: "lang-selected",
          purpose:
            "Stores your language preference (Spanish or English) detected from your system or chosen manually.",
          duration: "1 year (Cookie)",
        },
        {
          name: "theme-selected",
          purpose:
            "Preserves your visual palette choice (Cream or Crimson theme) across sessions.",
          duration: "Persistent (LocalStorage)",
        },
        {
          name: "consent-accepted",
          purpose:
            "Remembers your acknowledgment and acceptance of this privacy and cookie policy.",
          duration: "1 year (LocalStorage)",
        },
      ],
      footnote:
        "You may clear or manage these storage keys at any time via your browser's privacy settings.",
    },

    privacySection: {
      title: "Privacy & Data Processing Policy",
      p1: "Privacy is a cornerstone of this portfolio. Any details provided through the contact form (name, email, and message) are used strictly to reply to professional inquiries and collaboration opportunities.",
      p2: "Under no circumstances will your personal information be sold, rented, or distributed to third parties or marketing platforms.",
      rightsTitle: "Your Rights",
      rightsText:
        "You hold the right to request the rectification or total removal of any submitted communications by reaching out through the official contact channels.",
    },

    legalSection: {
      title: "Legal Notice & Intellectual Property",
      p1: "This website serves as a professional portfolio and creative development showcase owned by Sixto Steven Uriarte Moreira (The Filimisco).",
      p2: "All designs, source code, interactive animations, logos, and written works featured herein are protected by applicable intellectual property and copyright laws.",
      p3: "Third-party technologies and trademarks referenced (React, Next.js, etc.) belong to their respective holders and are mentioned purely for technical attribution.",
    },

    footerLink: "Legal Notice & Privacy",
  },
};
