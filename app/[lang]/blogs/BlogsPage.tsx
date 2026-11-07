"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Filter, ChevronDown, Mail, X } from "lucide-react";
import { toast } from "sonner";

import { useLanguage } from "@/context/LanguageContext";
import { getBlogsByLang, type BlogPost } from "@/data/blogs";
import BlogLoading from "./BlogLoading";

import heroBg from "@/app/assets/blogs/hero-flatlay.jpg";
import circuitImg from "@/app/assets/blogs/circuit.jpg";
import Navbar from "@/components/navbar/Navbar";

export default function BlogsPage({
  initialPosts,
  initialCategories,
  isLoading: isLoadingProp = false,
}: {
  initialPosts?: BlogPost[];
  initialCategories?: { id: string; label: string }[];
  isLoading?: boolean;
}) {
  const { lang, t } = useLanguage();
  const blogPosts =
    initialPosts && initialPosts.length > 0
      ? initialPosts
      : getBlogsByLang(lang);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("recent");
  const [isFiltersOpen, setIsFiltersOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [newsletterEmail, setNewsletterEmail] = useState<string>("");
  const [isFiltering, setIsFiltering] = useState<boolean>(false);
  const loadingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isLoading = isLoadingProp || isFiltering;

  const triggerLoading = () => {
    setIsFiltering(true);
    if (loadingTimeoutRef.current) clearTimeout(loadingTimeoutRef.current);
    loadingTimeoutRef.current = setTimeout(() => {
      setIsFiltering(false);
    }, 400);
  };

  useEffect(() => {
    return () => {
      if (loadingTimeoutRef.current) clearTimeout(loadingTimeoutRef.current);
    };
  }, []);

  const categories =
    initialCategories && initialCategories.length > 0
      ? initialCategories
      : t.blog.categories;
  const sortOptions = t.blog.sortOptions;

  // Filtered and sorted blog posts
  const filteredPosts = useMemo(() => {
    const filtered = blogPosts.filter((post) => {
      const matchesCategory =
        activeCategory === "all" || post.category === activeCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );

      if (sortBy === "favorites" && !post.favorite) return false;
      return matchesCategory && matchesSearch;
    });

    if (sortBy === "popular") {
      return [...filtered].sort(
        (a, b) => Number(Boolean(b.popular)) - Number(Boolean(a.popular))
      );
    }

    return filtered;
  }, [searchQuery, activeCategory, sortBy]);

  const featuredPost =
    filteredPosts.find((p) => p.featured) || filteredPosts[0] || blogPosts[0];
  const gridPosts = filteredPosts.slice(0, 4);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    try {
      await fetch("/api/subscribers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newsletterEmail.trim() }),
      });
    } catch {
      // Fallback notification if DB is not yet connected
    }
    toast.success(
      lang === "en"
        ? "Subscribed to the newsletter!"
        : "¡Suscrito al newsletter correctamente!"
    );
    setNewsletterEmail("");
  };

  const resetAllFilters = () => {
    setSearchQuery("");
    setActiveCategory("all");
    setSortBy("recent");
    setCurrentPage(1);
  };

  return (
    <div className="relative min-h-screen w-full bg-bg-primary text-text-primary overflow-x-hidden select-none transition-colors duration-500 pb-24">
      {/* Floating Navigation */}
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 pt-24 md:pt-32 space-y-8 sm:space-y-10">
        {/* ------------------------------------------------------------- */}
        {/* 1. CONTAINED ROUNDED HERO BANNER: "VIBE CODE IS REAL"         */}
        {/* ------------------------------------------------------------- */}
        <header className="relative w-full h-[360px] sm:h-[440px] md:h-[520px] rounded-3xl overflow-hidden shadow-xl">
          <Image
            src={heroBg}
            alt="Vibe Code Lifestyle Flatlay"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/20" />

          <div className="relative z-10 h-full flex flex-col justify-start p-8 sm:p-12 md:p-16 text-white max-w-2xl">
            <h1 className="uppercase tracking-tight leading-[0.95] drop-shadow-lg">
              <span className="block font-cinzel text-5xl sm:text-7xl md:text-8xl font-black tracking-wide">
                {t.blog.heroTitlePart1}
              </span>
              <span className="block font-editorial font-light text-4xl sm:text-6xl md:text-7xl tracking-wider mt-1.5 text-white/95">
                {t.blog.heroTitlePart2}
              </span>
            </h1>

            <p className="mt-5 font-editorial text-lg sm:text-xl md:text-2xl text-white/90 font-light leading-relaxed max-w-xl drop-shadow">
              {t.blog.heroSubtitle}
            </p>
          </div>
        </header>

        {/* ------------------------------------------------------------- */}
        {/* 2. MAIN BLOG BODY (Full Width OR 2-Column with Filters)       */}
        {/* ------------------------------------------------------------- */}
        <div
          className={`grid grid-cols-1 ${
            isFiltersOpen ? "lg:grid-cols-12 gap-8 lg:gap-10" : ""
          } items-start`}
        >
          {/* LEFT / MAIN COLUMN */}
          <div
            className={`${
              isFiltersOpen ? "lg:col-span-8" : "w-full"
            } space-y-8 sm:space-y-10`}
          >
            {/* Search & Filter Bar */}
            <div className="w-full rounded-2xl bg-[#FAF6ED]/85 dark:bg-white/5 border border-current/10 px-5 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between gap-4 shadow-sm backdrop-blur-md">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <Search size={20} className="opacity-60 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.blog.searchPlaceholder}
                  className="w-full bg-transparent text-base sm:text-lg font-editorial text-current placeholder:text-current/50 focus:outline-none"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="p-1.5 rounded-full hover:bg-current/10 opacity-60 hover:opacity-100 cursor-pointer"
                    aria-label="Clear search"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setCurrentPage(1);
                    triggerLoading();
                  }}
                  className="px-5 py-2 rounded-full text-sm sm:text-base font-editorial font-semibold bg-current/10 hover:bg-current/15 transition-colors cursor-pointer"
                >
                  {t.blog.searchBtn}
                </button>
                <button
                  type="button"
                  onClick={() => setIsFiltersOpen((prev) => !prev)}
                  className={`px-5 py-2 rounded-full text-sm sm:text-base font-editorial font-semibold transition-all cursor-pointer ${
                    isFiltersOpen
                      ? "bg-[#5B1614] text-[#FAF6ED] dark:bg-[#E9DFC9] dark:text-[#58120F]"
                      : "bg-current/10 hover:bg-current/15"
                  }`}
                >
                  {t.blog.filtersBtn}
                </button>
              </div>
            </div>

            {isLoading ? (
              <BlogLoading />
            ) : (
              <>
                {/* Featured Article Horizontal Card */}
                {featuredPost && (
                  <Link
                    href={`/${lang}/blogs/${featuredPost.slug}`}
                    className="group rounded-3xl bg-[#FAF6ED]/90 dark:bg-white/5 border border-current/10 p-5 sm:p-7 md:p-8 flex flex-col md:flex-row items-center gap-6 sm:gap-8 md:gap-10 shadow-sm hover:shadow-lg transition-all duration-300"
                  >
                    {/* Left Thumbnail Image */}
                    <div className="relative w-full md:w-[46%] h-64 sm:h-72 md:h-80 rounded-2xl overflow-hidden shrink-0 bg-black">
                      <Image
                        src={featuredPost.coverImageUrl || circuitImg}
                        alt={featuredPost.title}
                        fill
                        priority
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                      <span className="absolute bottom-4 left-4 px-4 py-1.5 rounded-full bg-[#FAF6ED] text-[#5B1614] text-xs sm:text-sm font-editorial font-semibold shadow-sm">
                        {t.blog.featuredBadge}
                      </span>
                    </div>

                    {/* Right Details */}
                    <div className="flex-1 space-y-4 sm:space-y-5 py-2 w-full">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="px-4 py-1.5 rounded-full bg-current/5 border border-current/10 text-xs sm:text-sm font-editorial opacity-80">
                          {featuredPost.date}
                        </span>
                        <span className="px-4 py-1.5 rounded-full bg-[#5B1614] text-[#FAF6ED] dark:bg-[#E9DFC9] dark:text-[#58120F] text-xs sm:text-sm font-editorial font-semibold">
                          {featuredPost.categoryLabel}
                        </span>
                      </div>

                      <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.08] group-hover:opacity-85 transition-opacity">
                        {featuredPost.title}
                      </h2>

                      <p className="font-editorial text-base sm:text-lg opacity-80 leading-relaxed line-clamp-2">
                        {featuredPost.excerpt}
                      </p>

                      <div className="pt-2">
                        <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm sm:text-base font-editorial font-semibold bg-[#5B1614] text-[#FAF6ED] dark:bg-[#E9DFC9] dark:text-[#58120F] group-hover:scale-105 transition-transform shadow-sm">
                          <span>{t.blog.readMore}</span>
                          <ChevronDown size={15} />
                        </span>
                      </div>
                    </div>
                  </Link>
                )}

                {/* "Últimas notas" Section Header */}
                <div className="flex items-end justify-between pt-2">
                  <div>
                    <h3 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-none">
                      {t.blog.latestTitle}
                    </h3>
                    <p className="mt-2 text-sm sm:text-base font-editorial opacity-75">
                      {t.blog.latestSubtitle}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={resetAllFilters}
                    className="text-sm sm:text-base font-editorial font-medium opacity-80 hover:opacity-100 hover:underline cursor-pointer"
                  >
                    {t.blog.viewAll}
                  </button>
                </div>

                {/* 2x2 Grid of Articles */}
                {gridPosts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                    {gridPosts.map((post) => (
                      <Link
                        key={post.id}
                        href={`/${lang}/blogs/${post.slug}`}
                        className="group relative h-72 sm:h-80 md:h-[340px] rounded-3xl overflow-hidden bg-black p-6 sm:p-7 flex flex-col justify-between shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                      >
                        <Image
                          src={post.coverImageUrl || circuitImg}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/15" />

                        {/* Top Date Pill */}
                        <div className="relative z-10">
                          <span className="inline-block px-4 py-1.5 rounded-full bg-[#FAF6ED]/95 text-[#5B1614] text-xs sm:text-sm font-editorial font-semibold shadow-sm">
                            {post.date}
                          </span>
                        </div>

                        {/* Bottom Title + Read More Pill */}
                        <div className="relative z-10 space-y-3.5">
                          <h4 className="font-editorial text-2xl sm:text-3xl font-bold text-white leading-tight">
                            {post.title}
                          </h4>
                          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-editorial font-semibold bg-[#5B1614] text-[#FAF6ED] border border-white/10 group-hover:scale-105 transition-transform shadow-sm">
                            <span>{t.blog.readMore}</span>
                            <ChevronDown size={14} />
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="p-12 text-center rounded-3xl bg-[#FAF6ED]/70 dark:bg-white/5 border border-current/10 space-y-4">
                    <p className="font-editorial text-2xl opacity-80">
                      {t.blog.noArticles}
                    </p>
                    <button
                      type="button"
                      onClick={resetAllFilters}
                      className="px-6 py-2.5 rounded-full text-sm font-editorial font-semibold bg-[#5B1614] text-[#FAF6ED] cursor-pointer"
                    >
                      {t.blog.resetFilters}
                    </button>
                  </div>
                )}

                {/* Pagination Controls */}
                <div className="flex items-center gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentPage((p) => Math.max(1, p - 1));
                      triggerLoading();
                    }}
                    className="px-4 py-2 rounded-full text-sm font-editorial border border-current/15 bg-[#FAF6ED]/60 dark:bg-white/5 opacity-80 hover:opacity-100 cursor-pointer"
                  >
                    {t.blog.prevPage}
                  </button>
                  {[1, 2, 3].map((page) => (
                    <button
                      key={page}
                      type="button"
                      onClick={() => {
                        setCurrentPage(page);
                        triggerLoading();
                      }}
                      className={`w-9 h-9 rounded-full text-sm font-editorial flex items-center justify-center transition-all cursor-pointer ${
                        currentPage === page
                          ? "bg-[#5B1614] text-[#FAF6ED] dark:bg-[#E9DFC9] dark:text-[#58120F] font-bold shadow-sm"
                          : "border border-current/15 bg-[#FAF6ED]/60 dark:bg-white/5 opacity-75 hover:opacity-100"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentPage((p) => Math.min(3, p + 1));
                      triggerLoading();
                    }}
                    className="px-4 py-2 rounded-full text-sm font-editorial border border-current/15 bg-[#FAF6ED]/60 dark:bg-white/5 opacity-80 hover:opacity-100 cursor-pointer"
                  >
                    {t.blog.nextPage}
                  </button>
                </div>
              </>
            )}
          </div>

          {/* RIGHT SIDEBAR COLUMN (Visible when Filters Open) */}
          {isFiltersOpen && (
            <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24 animate-in fade-in slide-in-from-right-4 duration-300">
              {/* Filters White/Cream Card */}
              <div className="rounded-3xl bg-[#FAF6ED]/90 dark:bg-white/5 border border-current/10 p-6 sm:p-7 space-y-6 shadow-md">
                {/* Header */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-current/10 flex items-center justify-center">
                    <Filter size={16} className="opacity-80" />
                  </div>
                  <div>
                    <h3 className="font-editorial text-2xl font-bold leading-none">
                      {t.blog.filterTitle}
                    </h3>
                    <p className="text-sm font-editorial opacity-70 mt-1">
                      {t.blog.filterSubtitle}
                    </p>
                  </div>
                </div>

                {/* Close Filters Button */}
                <button
                  type="button"
                  onClick={() => setIsFiltersOpen(false)}
                  className="w-full py-3 rounded-full text-sm sm:text-base font-editorial font-semibold bg-[#5B1614] text-[#FAF6ED] dark:bg-[#E9DFC9] dark:text-[#58120F] hover:opacity-95 transition-opacity cursor-pointer shadow-sm"
                >
                  {t.blog.closeFiltersBtn}
                </button>

                {/* Category Radio Pills */}
                <div className="space-y-2.5">
                  {categories.map((cat) => {
                    const isSelected = activeCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() =>
                          setActiveCategory(isSelected ? "all" : cat.id)
                        }
                        className={`w-full px-4 py-3 rounded-xl text-sm sm:text-base font-editorial flex items-center gap-3 transition-all cursor-pointer ${
                          isSelected
                            ? "bg-[#5B1614] text-[#FAF6ED] dark:bg-[#E9DFC9] dark:text-[#58120F] font-semibold shadow-sm"
                            : "bg-white/60 dark:bg-white/5 border border-current/10 hover:border-current/25"
                        }`}
                      >
                        <span
                          className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            isSelected
                              ? "border-current bg-current"
                              : "border-current/40"
                          }`}
                        >
                          {isSelected && (
                            <span className="w-2 h-2 rounded-full bg-[#5B1614] dark:bg-[#E9DFC9]" />
                          )}
                        </span>
                        <span>{cat.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Sort By Options */}
                <div className="space-y-2.5 pt-1">
                  <span className="text-sm sm:text-base font-editorial font-semibold opacity-80 block">
                    {t.blog.sortByLabel}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {sortOptions.map((opt) => {
                      const isActive = sortBy === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setSortBy(opt.id)}
                          className={`px-4 py-2 rounded-full text-sm font-editorial transition-all cursor-pointer ${
                            isActive
                              ? "bg-[#5B1614] text-[#FAF6ED] dark:bg-[#E9DFC9] dark:text-[#58120F] font-semibold shadow-sm"
                              : "bg-current/5 border border-current/10 opacity-80 hover:opacity-100"
                          }`}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Apply Filters Button */}
                <button
                  type="button"
                  onClick={() => {
                    setCurrentPage(1);
                    triggerLoading();
                  }}
                  className="w-full py-3 rounded-full text-sm sm:text-base font-editorial font-semibold bg-[#5B1614] text-[#FAF6ED] dark:bg-[#E9DFC9] dark:text-[#58120F] hover:opacity-95 transition-opacity cursor-pointer shadow-sm"
                >
                  {t.blog.applyFiltersBtn}
                </button>
              </div>

              {/* Compact Newsletter Card in Sidebar */}
              <div className="rounded-3xl bg-[#5B1614] text-[#FAF6ED] p-6 sm:p-7 space-y-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
                    <Mail size={16} />
                  </div>
                  <div>
                    <h4 className="font-editorial text-2xl font-bold leading-none">
                      {t.blog.newsletterTitle}
                    </h4>
                    <p className="text-sm font-editorial text-white/80 mt-1">
                      {t.blog.newsletterSubtitle}
                    </p>
                  </div>
                </div>

                <form
                  onSubmit={handleNewsletterSubmit}
                  className="flex items-center bg-white/10 border border-white/15 rounded-full p-1.5 pl-4"
                >
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder={t.blog.newsletterPlaceholder}
                    className="w-full bg-transparent text-sm sm:text-base font-editorial text-white placeholder:text-white/60 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-full bg-[#FAF6ED] text-[#5B1614] text-sm font-editorial font-semibold hover:scale-105 transition-transform cursor-pointer shrink-0"
                  >
                    {t.blog.newsletterBtn}
                  </button>
                </form>

                <p className="text-xs sm:text-sm font-editorial text-white/75 leading-relaxed">
                  {t.blog.newsletterConsentPrefix}{" "}
                  <button
                    type="button"
                    onClick={() => {
                      if (typeof window !== "undefined") {
                        window.dispatchEvent(
                          new CustomEvent("open-legal-modal", {
                            detail: { tab: "privacy" },
                          })
                        );
                      }
                    }}
                    className="underline font-semibold text-white hover:opacity-90 cursor-pointer"
                  >
                    {t.blog.newsletterConsentLink}
                  </button>
                  .
                </p>
              </div>
            </aside>
          )}
        </div>

        {/* ------------------------------------------------------------- */}
        {/* 3. BOTTOM FULL-WIDTH NEWSLETTER BANNER (When Filters Closed)  */}
        {/* ------------------------------------------------------------- */}
        {!isFiltersOpen && (
          <section className="rounded-3xl bg-[#5B1614] text-[#FAF6ED] p-7 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
            <div className="flex items-start sm:items-center gap-4">
              <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
                <Mail size={20} />
              </div>
              <div>
                <h3 className="font-editorial text-2xl sm:text-3xl font-bold leading-tight">
                  {t.blog.newsletterTitle}
                </h3>
                <p className="text-sm sm:text-base font-editorial text-white/85">
                  {t.blog.newsletterSubtitle}
                </p>
                <p className="text-xs sm:text-sm font-editorial text-white/75 mt-1 leading-relaxed max-w-xl">
                  {t.blog.newsletterConsentPrefix}{" "}
                  <button
                    type="button"
                    onClick={() => {
                      if (typeof window !== "undefined") {
                        window.dispatchEvent(
                          new CustomEvent("open-legal-modal", {
                            detail: { tab: "privacy" },
                          })
                        );
                      }
                    }}
                    className="underline font-semibold text-white hover:opacity-90 cursor-pointer"
                  >
                    {t.blog.newsletterConsentLink}
                  </button>
                  .
                </p>
              </div>
            </div>

            <form
              onSubmit={handleNewsletterSubmit}
              className="flex items-center bg-white/10 border border-white/15 rounded-full p-1.5 pl-5 w-full md:w-96 shrink-0"
            >
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder={t.blog.newsletterPlaceholder}
                className="w-full bg-transparent text-sm sm:text-base font-editorial text-white placeholder:text-white/60 focus:outline-none"
              />
              <button
                type="submit"
                className="px-5 py-2 rounded-full bg-[#FAF6ED] text-[#5B1614] text-sm sm:text-base font-editorial font-semibold hover:scale-105 transition-transform cursor-pointer shrink-0"
              >
                {t.blog.newsletterBtn}
              </button>
            </form>
          </section>
        )}
      </div>
    </div>
  );
}
