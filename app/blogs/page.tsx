"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Filter, Sparkles, ArrowRight, X, Calendar, Clock, BookOpen, Tag } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useLanguage } from "@/context/LanguageContext";
import { blogPosts, BlogPost } from "@/data/blogs";

import heroBg from "@/app/assets/blogs/hero-flatlay.jpg";
import circuitImg from "@/app/assets/blogs/circuit.jpg";

const categories = [
  { id: "all", label: "Todos los Artículos" },
  { id: "vibe-coding", label: "Vibe Coding" },
  { id: "creative-dev", label: "Creative Dev" },
  { id: "full-stack", label: "Full Stack" },
  { id: "art-code", label: "UI & Arte" },
];

export default function BlogsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  // Filtered blog posts based on search query and category
  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesCategory =
        activeCategory === "all" || post.category === activeCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  const featuredPost = filteredPosts.find((p) => p.featured) || filteredPosts[0];
  const regularPosts = filteredPosts.filter((p) => p.id !== featuredPost?.id);

  return (
    <div className="relative min-h-screen w-full bg-bg-primary text-text-primary overflow-x-hidden select-none transition-colors duration-500">
      {/* Floating Navigation */}
      <Navbar />

      {/* ------------------------------------------------------------- */}
      {/* 1. HERO SECTION: "VIBE CODE IS REAL"                          */}
      {/* ------------------------------------------------------------- */}
      <header className="relative w-full h-[70vh] sm:h-[80vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        {/* Hero Background Image with Atmospheric Overlay */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={heroBg}
            alt="Vibe Code Lifestyle Flatlay"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-black/30 to-black/50" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white space-y-4">
          <h1 className="font-cinzel text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight leading-[0.95] drop-shadow-2xl">
            VIBE CODE
            <span className="block font-editorial font-light italic text-4xl sm:text-6xl md:text-7xl lg:text-8xl mt-1 text-[#FAF6ED]/90">
              IS REAL
            </span>
          </h1>

          <p className="font-editorial text-base sm:text-xl md:text-2xl italic text-[#FAF6ED]/80 font-light max-w-xl mx-auto pt-2">
            Pensamientos, crónicas y experimentos sobre desarrollo, arte y código.
          </p>
        </div>
      </header>

      {/* ------------------------------------------------------------- */}
      {/* 2. MAIN BLOG BODY                                             */}
      {/* ------------------------------------------------------------- */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 py-10 sm:py-16 space-y-10 sm:space-y-12">
        
        {/* Search Bar (Rounded Deep Crimson Pill) */}
        <div className="w-full max-w-2xl">
          <div className="relative flex items-center w-full bg-[#58120F] dark:bg-[#470D0B] text-[#E9DFC9] rounded-full px-5 py-3 sm:py-3.5 shadow-lg border border-[#E9DFC9]/15 focus-within:ring-2 focus-within:ring-accent transition-all">
            <Search size={18} className="text-[#E9DFC9]/70 shrink-0 mr-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar artículos, tecnologías o conceptos..."
              className="w-full bg-transparent text-sm sm:text-base font-sans-clean text-[#E9DFC9] placeholder-[#E9DFC9]/50 focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="p-1 rounded-full hover:bg-black/20 text-[#E9DFC9]/70 hover:text-[#E9DFC9] cursor-pointer ml-2"
                title="Limpiar búsqueda"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* 2-Column Main Feed + Sticky Sidebar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* --------------------------------------------------------- */}
          {/* LEFT: Articles Feed (Featured + Grid)                    */}
          {/* --------------------------------------------------------- */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Featured Hero Article Banner */}
            {featuredPost && (
              <Link
                href={`/blogs/${featuredPost.slug}`}
                className="group relative w-full rounded-3xl overflow-hidden glass-card border border-current/15 shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer flex flex-col justify-end min-h-[320px] sm:min-h-[400px] p-6 sm:p-8 block"
              >
                {/* Circuit Background */}
                <div className="absolute inset-0 w-full h-full bg-black/60 overflow-hidden">
                  <Image
                    src={circuitImg}
                    alt={featuredPost.title}
                    fill
                    priority
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/30 group-hover:from-black/90 transition-colors" />
                </div>

                {/* Content Overlay */}
                <div className="relative z-10 text-white space-y-3">
                  <div className="flex items-center gap-3 text-xs font-cinzel text-white/80 flex-wrap">
                    <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/80 backdrop-blur-md text-[#FAF6ED] text-[10px] font-bold uppercase tracking-wider">
                      <Sparkles size={11} />
                      {featuredPost.categoryLabel}
                    </span>
                    <span>{featuredPost.date}</span>
                    <span>• {featuredPost.readTime}</span>
                  </div>

                  <h2 className="font-editorial text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#FAF6ED] leading-snug group-hover:text-white transition-colors">
                    {featuredPost.title}
                  </h2>

                  <p className="font-sans-clean text-xs sm:text-sm text-white/80 font-light line-clamp-2 max-w-2xl leading-relaxed">
                    {featuredPost.excerpt}
                  </p>

                  <div className="pt-2">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-cinzel tracking-wider uppercase font-semibold bg-[#58120F] text-[#E9DFC9] border border-[#E9DFC9]/20 group-hover:scale-105 transition-all shadow-md">
                      <span>Ver más</span>
                      <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            )}

            {/* Grid of Remaining Articles (2 columns) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {regularPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blogs/${post.slug}`}
                  className="group relative rounded-2xl sm:rounded-3xl overflow-hidden glass-card border border-current/15 shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-1 cursor-pointer flex flex-col justify-between p-5 sm:p-6 min-h-[260px] block"
                >
                  {/* Circuit Background Thumbnail */}
                  <div className="absolute inset-0 w-full h-full bg-black/60 overflow-hidden">
                    <Image
                      src={circuitImg}
                      alt={post.title}
                      fill
                      className="object-cover opacity-60 transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/40" />
                  </div>

                  {/* Top Metadata */}
                  <div className="relative z-10 text-white/80 text-[11px] font-cinzel flex items-center justify-between">
                    <span>{post.date}</span>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-white/10 border border-white/10">
                      {post.categoryLabel}
                    </span>
                  </div>

                  {/* Title & Excerpt */}
                  <div className="relative z-10 text-white space-y-2 mt-auto pt-4">
                    <h3 className="font-editorial text-xl sm:text-2xl font-bold tracking-tight text-[#FAF6ED] leading-snug group-hover:text-white transition-colors">
                      {post.title}
                    </h3>

                    <p className="font-sans-clean text-xs text-white/75 font-light line-clamp-2 leading-relaxed">
                      {post.excerpt}
                    </p>

                    <div className="pt-2 flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] font-cinzel tracking-wider uppercase font-semibold bg-[#58120F] text-[#E9DFC9] border border-[#E9DFC9]/20 group-hover:scale-105 transition-all shadow-sm">
                        <span>Ver más</span>
                        <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
                      </span>

                      <span className="text-[10px] font-cinzel text-white/60">
                        {post.readTime}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="p-10 text-center glass-card rounded-3xl space-y-3">
                <p className="font-editorial text-2xl font-light opacity-80">
                  No se encontraron crónicas o artículos para tu búsqueda.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("all");
                  }}
                  className="px-5 py-2 rounded-full text-xs font-cinzel uppercase tracking-wider bg-current text-white dark:text-black font-semibold cursor-pointer"
                >
                  Restablecer filtros
                </button>
              </div>
            )}
          </div>

          {/* --------------------------------------------------------- */}
          {/* RIGHT: Crimson Sticky Sidebar                             */}
          {/* --------------------------------------------------------- */}
          <aside className="lg:col-span-4 sticky top-24 space-y-6">
            <div className="rounded-3xl p-6 sm:p-8 bg-[#58120F] text-[#E9DFC9] shadow-2xl border border-[#E9DFC9]/15 space-y-6">
              
              {/* Sidebar Header */}
              <div className="flex items-center gap-2.5 border-b border-[#E9DFC9]/15 pb-4">
                <Filter size={18} className="text-[#C5A059]" />
                <h3 className="font-cinzel text-lg font-bold tracking-wider uppercase">
                  Filters
                </h3>
              </div>

              {/* Category Filter Pills */}
              <div className="space-y-2">
                <span className="text-[10px] font-cinzel uppercase tracking-widest opacity-60 block mb-2">
                  Categorías
                </span>
                <div className="flex flex-col gap-1.5">
                  {categories.map((cat) => {
                    const isActive = activeCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`w-full text-left px-3.5 py-2 rounded-xl text-xs font-cinzel tracking-wider transition-all cursor-pointer flex items-center justify-between ${
                          isActive
                            ? "bg-[#E9DFC9] text-[#58120F] font-bold shadow-md scale-[1.02]"
                            : "hover:bg-black/20 text-[#E9DFC9]/80 hover:text-[#E9DFC9]"
                        }`}
                      >
                        <span>{cat.label}</span>
                        {isActive && <span className="text-xs">●</span>}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Author / Manifesto Capsule */}
              <div className="pt-4 border-t border-[#E9DFC9]/15 space-y-3">
                <div className="flex items-center gap-2 text-xs font-cinzel font-semibold opacity-90">
                  <BookOpen size={14} className="text-[#C5A059]" />
                  <span>The Vibe Manifest</span>
                </div>
                <p className="font-editorial text-xs sm:text-sm font-light italic leading-relaxed text-[#E9DFC9]/80">
                  "El código bien forjado es como la poesía: invisible para quien lo ejecuta, pero transformador para quien lo experimenta."
                </p>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
