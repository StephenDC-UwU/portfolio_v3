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
    title:
      "Sixto Uriarte (The Filimisco) | Full Stack Developer — React, Next.js & TypeScript",
    description:
      "Portfolio of Sixto Steven Uriarte Moreira (The Filimisco), Full Stack Developer specializing in scalable web applications, modern backend architectures, and interactive UI engineering with React, Next.js, TypeScript, and Node.js.",
    keywords: [
      "Sixto Uriarte",
      "Sixto Steven Uriarte Moreira",
      "The Filimisco",
      "Full Stack Developer",
      "Software Engineer",
      "Frontend Developer",
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Creative Developer",
      "Web Developer Portfolio",
    ],
  },
  nav: {
    home: "Home",
    about: "About",
    process: "Process",
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
  process: {
    tagline: "MY APPROACH",
    rightLabel: "A shared process",
    title: "How I work with your idea.",
    subtitle: "From your initial concept to a first version you can use.",
    steps: [
      {
        number: "01",
        title: "Understand the problem",
        description: "We define what you need and who it is for.",
      },
      {
        number: "02",
        title: "Design & ideas",
        description: "We explore concepts and shape the visual design.",
      },
      {
        number: "03",
        title: "Beta prototype",
        description: "A first working version to use, test, and refine.",
      },
    ],
    ctaTitle: "What if we start with a conversation?",
    ctaSubtitle:
      "Tell me what you have in mind, even if it's still just a sketch.",
    ctaButton: "Let's talk about your idea",
  },
  projects: {
    tagline: "CURATED WORKS",
    title: "Featured Projects",
    filterAll: "All",
    filterCreative: "Creative Dev",
    filterLanding: "Landing Page",
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
    quote: "Art is not what you see, but what you make others see.",
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
      "An editorial selection of notes, projects, and visual findings crafted to read, explore, and revisit.",
    heroTitlePart1: "Blogs, Articles and Notes",
    heroTitlePart2: "",
    heroSubtitle:
      "An editorial selection of notes, projects, and visual findings crafted to read, explore, and revisit.",
    searchPlaceholder: "Search notes, projects, or topics",
    searchBtn: "Search",
    filtersBtn: "Filters",
    closeFiltersBtn: "Close filters",
    applyFiltersBtn: "Apply filters",
    filterTitle: "Filters",
    filterSubtitle: "Explore by topic",
    categoriesLabel: "Categories",
    categories: [
      { id: "editorial", label: "Editorial" },
      { id: "proyectos", label: "Projects" },
      { id: "notas-de-campo", label: "Field notes" },
      { id: "especimenes", label: "Specimens" },
    ],
    sortByLabel: "Sort by",
    sortOptions: [
      { id: "recent", label: "Most recent" },
      { id: "popular", label: "Popular" },
      { id: "favorites", label: "Favorites" },
    ],
    featuredBadge: "Featured note",
    latestTitle: "Latest notes",
    latestSubtitle: "Most recent from the blog",
    viewAll: "View all",
    viewAllRelated: "View all",
    readMore: "Read more",
    loadingText: "Loading...",
    loadingSubtext: "Preparing the blog chronicles",
    prevPage: "Previous",
    nextPage: "Next",
    noArticles: "No articles or chronicles were found matching your search.",
    resetFilters: "Reset filters",
    newsletterTitle: "Newsletter",
    newsletterSubtitle: "Get new notes",
    newsletterDescription: "Receive the latest blog publications.",
    newsletterConsentPrefix:
      "By subscribing, you consent to the use of your email to receive new posts in accordance with our",
    newsletterConsentLink: "Privacy Policy",
    newsletterPlaceholder: "Your email",
    newsletterBtn: "Subscribe",
    backToBlog: "Back to Blog",
    inThisArticle: "In this article",
    tocNote: "Article contents to jump directly to each section.",
    closingThanks: "Thank you for reading this note from start to finish.",
    relatedTitle: "Related articles",
    relatedSubtitle: "Continue exploring the blog notes",
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
      p2: "Under no circumstances will your personal information be sold, rented, or distributed to third parties or external marketing platforms.",
      newsletterTitle: "Newsletter Subscription & Email Communications",
      newsletterText:
        "By entering your email address and subscribing to our Newsletter in the Blog section, you grant your explicit and informed consent (Art. 6.1.a GDPR) for us to store your email in our database for the sole purpose of sending you email notifications about new notes, articles, and editorial publications. We never send spam or third-party commercial emails.",
      rightsTitle: "Your Rights (Access, Unsubscribe & Erasure)",
      rightsText:
        "You hold the right to request access, rectification, withdrawal of consent, or total removal and unsubscription of your email from the Newsletter or any submitted communications at any time by reaching out through the official contact channels.",
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
