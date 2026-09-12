# 🏛️ The Filimisco — Portfolio V3

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-3-88CE02?style=for-the-badge&logo=greensock)](https://greensock.com/gsap/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-black?style=for-the-badge&logo=vercel)](https://vercel.com/)

> **"Art is everywhere."**  
> Personal portfolio & blog of **Sixto Steven Uriarte Moreira** (_The Filimisco_). Crafted as an immersive editorial experience merging art direction, high-performance web engineering, and modern architecture.

---

## ✨ Key Features

- 🌍 **Multilingual Support (i18n):** Locale-based routing (`/es` and `/en`) with dictionary-driven dynamic translations and client persistence.
- 🎨 **Editorial Design & Classical Typography:** Premium visual identity powered by _Cormorant Garamond_, _Cinzel_, and _EB Garamond_.
- 🎭 **Fluid Animations:** High-impact transitions and micro-interactions powered by **GSAP** and `@gsap/react`.
- 🌓 **Theme Manager (Dark/Light Mode):** Seamless theme switching integrated with CSS Variables and `ThemeContext`.
- 🛡️ **Robust Form Validation:** Fully typed and validated contact form using **React Hook Form** + **Zod**.
- 🔔 **Elegant Notifications:** Interactive user feedback powered by **Sonner** (`<Toaster />`).
- ⚡ **Performance & Advanced SEO:**
  - Edge optimization and real-time Core Web Vitals monitoring with `@vercel/analytics` and `@vercel/speed-insights`.
  - Dynamic metadata, `hreflang` / `alternates` for multi-language indexing, and OpenGraph social cards.
- 🍪 **Cookie Consent:** Modular cookie banner for privacy compliance.

---

## 🛠️ Tech Stack

### **Frontend & Framework**

- [**Next.js 16 (App Router)**](https://nextjs.org/) — Server Components, SSR, and Static Site Generation.
- [**React 19**](https://react.dev/) — Latest concurrent rendering and hooks.
- [**TypeScript**](https://www.typescriptlang.org/) — Strict type safety across the entire codebase.

### **Styling & Motion**

- [**Tailwind CSS v4**](https://tailwindcss.com/) — Modern utility-first CSS engine with dynamic CSS variables.
- [**GSAP (GreenSock)**](https://greensock.com/gsap/) — High-performance animation engine for web interactions.
- [**Lucide React**](https://lucide.dev/) — Clean, lightweight vector icons.

### **Forms, Validation & Networking**

- [**React Hook Form**](https://react-hook-form.com/) & [**Zod**](https://zod.dev/) — Performant form state management and schema validation.
- [**Axios**](https://axios-http.com/) — Promise-based HTTP client.

### **Analytics & Deployment**

- [**Vercel Web Analytics**](https://vercel.com/analytics) — Privacy-friendly traffic insights.
- [**Vercel Speed Insights**](https://vercel.com/docs/speed-insights) — Real-world user experience (RUM) metrics and Core Web Vitals.

---

## 📁 Project Structure

```text
portfolio_v3/
├── app/
│   ├── [lang]/              # Multilingual dynamic routes (/es, /en)
│   │   ├── (home)/          # Main portfolio pages & sections
│   │   ├── blogs/           # Blog listing and articles
│   │   ├── layout.tsx       # Root layout with fonts, Analytics & Speed Insights
│   │   └── page.tsx         # Language handler / root redirect
│   ├── globals.css          # Global CSS tokens and theme variables
│   └── assets/              # Static multimedia assets
├── components/              # Modular & reusable UI components
├── context/                 # React Contexts (ThemeContext, LanguageContext)
├── data/                    # Static datasets (projects, blogs, timeline)
├── dictionaries/            # Localization dictionaries (es.ts, en.ts)
├── public/                  # Static assets, fonts (.ttf), and favicons
├── types/                   # Global TypeScript interfaces & types
└── .env                     # Local environment variables
```

---

## 🚀 Getting Started

Follow these steps to set up and run the project locally:

### 1. Prerequisites

Make sure you have installed:
- [Node.js](https://nodejs.org/) (version 20 or higher recommended)
- [pnpm](https://pnpm.io/) _(recommended)_, `npm`, or `yarn`

### 2. Clone the Repository

```bash
git clone https://github.com/StephenDC-UwU/portfolio_v3.git
cd portfolio_v3
```

### 3. Install Dependencies

With **pnpm**:

```bash
pnpm install
```

_(Or using `npm install` / `yarn install`)_

### 4. Configure Environment Variables

Create a `.env.local` or `.env` file in the root directory and configure the required variables:

```env
# Contact Form API endpoint
NEXT_PUBLIC_CONTACT_API_URL=your_api_endpoint_here

# (Optional) Base Site URL for SEO and Sitemaps
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 5. Start the Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 📦 Available Scripts

In `package.json`, you can run the following commands:

| Command | Description |
| :--- | :--- |
| `pnpm dev` | Starts the development server with Hot Module Replacement (HMR). |
| `pnpm build` | Compiles and optimizes the application for production. |
| `pnpm start` | Runs the compiled production server. |
| `pnpm lint` | Runs ESLint to identify code quality issues. |
| `pnpm tsc` | Runs the TypeScript compiler to verify type definitions. |

---

## 🌐 Deploying to Vercel

The project is optimized for deployment on the **Vercel Platform**:

1. Push your code to GitHub / GitLab.
2. Import the repository into the [Vercel Dashboard](https://vercel.com/new).
3. Add the environment variables configured in your `.env`.
4. Click **Deploy**.

---

## 👤 Author

**Sixto Steven Uriarte Moreira** (_The Filimisco_)

- GitHub: [@StephenDC-UwU](https://github.com/StephenDC-UwU)
- Website: [thefilimisco.com](https://thefilimisco.com)

---

## 📄 License

This project is for personal and private use. All rights reserved.
