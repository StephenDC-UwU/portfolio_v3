import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ChevronDown } from "lucide-react";

import Navbar from "@/components/navbar/Navbar";
import { blogPosts } from "@/data/blogs";
import {
  getPublishedBlogPostBySlug,
  getPublishedBlogPosts,
} from "@/lib/payload-blogs";
import { ES } from "@/dictionaries/es";
import { EN } from "@/dictionaries/en";
import circuitImg from "@/app/assets/blogs/circuit.jpg";

interface BlogPostPageProps {
  params: Promise<{
    lang: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const locales = ["es", "en"];
  return locales.flatMap((lang) =>
    blogPosts.map((post) => ({
      lang,
      slug: post.slug,
    }))
  );
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { lang, slug } = await params;
  const post = await getPublishedBlogPostBySlug(slug, lang);
  if (!post) return { title: "Artículo No Encontrado | The Filimisco" };

  return {
    title: `${post.title} | The Filimisco`,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | The Filimisco`,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | The Filimisco`,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { lang, slug } = await params;
  const [post, allPosts] = await Promise.all([
    getPublishedBlogPostBySlug(slug, lang),
    getPublishedBlogPosts(lang),
  ]);

  if (!post) {
    notFound();
  }

  const t = lang === "en" ? EN : ES;
  const relatedPosts = allPosts
    .filter((p) => p.id !== post.id && p.slug !== post.slug)
    .slice(0, 2);

  return (
    <div className="relative min-h-screen w-full bg-bg-primary text-text-primary overflow-x-hidden transition-colors duration-500 pb-24">
      {/* Floating Navigation */}
      <Navbar />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 pt-24 md:pt-32 space-y-10 sm:space-y-12">
        {/* Top Back Link */}
        <div>
          <Link
            href={`/${lang}/blogs`}
            className="inline-flex items-center gap-2 text-sm sm:text-base font-editorial font-medium opacity-80 hover:opacity-100 transition-opacity"
          >
            <ArrowLeft size={16} />
            <span>{t.blog.backToBlog}</span>
          </Link>
        </div>

        {/* Article Header (Badges, Title & Subtitle) */}
        <header className="space-y-5">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="px-4 py-1.5 rounded-full bg-[#FAF6ED]/80 dark:bg-white/5 border border-current/10 text-xs sm:text-sm
            lg:text-lg font-editorial opacity-85">
              {post.date}
            </span>
            <span className="px-4 py-1.5 rounded-full bg-[#5B1614] text-[#FAF6ED] dark:bg-[#E9DFC9] dark:text-[#58120F] text-xs sm:text-sm font-editorial font-semibold">
              {post.categoryLabel}
            </span>
            <span className="text-xs sm:text-sm lg:text-base font-editorial opacity-75">
              {post.readTime}
            </span>
          </div>

          <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.04] max-w-4xl">
            {post.title}
          </h1>

          <p className="font-editorial text-lg sm:text-xl md:text-2xl opacity-85 leading-relaxed max-w-3xl">
            {post.excerpt}
          </p>
        </header>

        {/* Featured Cover Banner */}
        <div className="relative w-full h-72 sm:h-[420px] md:h-[520px] rounded-3xl overflow-hidden shadow-xl bg-black">
          <Image
            src={post.coverImageUrl || circuitImg}
            alt={post.title}
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* 2-Column Body: Sticky Table of Contents + Article Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start pt-4">
          {/* Left Sticky Table of Contents Card */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24">
            <div className="rounded-3xl bg-[#FAF6ED]/90 dark:bg-white/5 border border-current/10 p-6 sm:p-7 space-y-5 shadow-sm">
              <h2 className="font-editorial text-xl sm:text-2xl font-bold">
                {t.blog.inThisArticle}
              </h2>

              <nav className="space-y-3">
                {post.sections.map((sec) => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    className="group flex items-start gap-3 text-sm sm:text-base font-editorial opacity-80 hover:opacity-100 transition-opacity leading-snug"
                  >
                    <span className="text-xs sm:text-sm font-semibold opacity-55 mt-0.5 shrink-0">
                      {sec.number}
                    </span>
                    <span className="group-hover:underline">{sec.heading}</span>
                  </a>
                ))}
              </nav>

              <p className="pt-4 border-t border-current/10 text-xs sm:text-sm font-editorial opacity-60 leading-relaxed">
                {t.blog.tocNote}
              </p>
            </div>
          </aside>

          {/* Right Main Article Prose */}
          <article className="lg:col-span-8 space-y-10 sm:space-y-12">
            {post.sections.map((sec) => (
              <section
                key={sec.id}
                id={sec.id}
                className="scroll-mt-28 space-y-4"
              >
                <h2 className="font-editorial text-3xl sm:text-4xl font-bold tracking-tight">
                  {sec.heading}
                </h2>

                {sec.paragraphs.map((p, idx) => (
                  <p
                    key={idx}
                    className="font-editorial text-lg sm:text-xl md:text-[22px] leading-relaxed opacity-90"
                  >
                    {p}
                  </p>
                ))}

                {sec.imageUrl && (
                  <figure className="my-6 space-y-2.5">
                    <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-3xl overflow-hidden shadow-lg bg-black/20">
                      <Image
                        src={sec.imageUrl}
                        alt={sec.imageAlt || sec.heading}
                        fill
                        className="object-cover"
                      />
                    </div>
                    {sec.imageCaption && (
                      <figcaption className="text-sm sm:text-base font-editorial italic opacity-70 text-center">
                        {sec.imageCaption}
                      </figcaption>
                    )}
                  </figure>
                )}

                {sec.quote && (
                  <blockquote className="my-6 rounded-3xl bg-current/5 border border-current/10 p-6 sm:p-8 space-y-2.5">
                    <p className="font-editorial italic text-2xl sm:text-3xl font-medium leading-snug">
                      {sec.quote.text}
                    </p>
                    <footer className="text-sm sm:text-base font-editorial opacity-70">
                      {sec.quote.author}
                    </footer>
                  </blockquote>
                )}
              </section>
            ))}

            {/* Closing Note & Back Button */}
            <div className="pt-8 border-t border-current/10 space-y-5">
              <p className="font-editorial italic text-base sm:text-lg opacity-75">
                {t.blog.closingThanks}
              </p>

              <Link
                href={`/${lang}/blogs`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-current/15 bg-[#FAF6ED]/70 dark:bg-white/5 text-sm sm:text-base font-editorial font-medium opacity-85 hover:opacity-100 transition-opacity"
              >
                <ArrowLeft size={15} />
                <span>{t.blog.backToBlog}</span>
              </Link>
            </div>
          </article>
        </div>

        {/* Related Articles Section */}
        <section className="pt-10 sm:pt-12 border-t border-current/15 space-y-6">
          <div className="flex items-end justify-between">
            <div>
              <h3 className="font-editorial text-3xl sm:text-4xl font-bold tracking-tight leading-none">
                {t.blog.relatedTitle}
              </h3>
              <p className="mt-2 text-sm sm:text-base font-editorial opacity-75">
                {t.blog.relatedSubtitle}
              </p>
            </div>

            <Link
              href={`/${lang}/blogs`}
              className="text-sm sm:text-base font-editorial font-medium opacity-80 hover:opacity-100 hover:underline"
            >
              {t.blog.viewAllRelated}
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {relatedPosts.map((rel) => (
              <Link
                key={rel.id}
                href={`/${lang}/blogs/${rel.slug}`}
                className="group relative h-72 sm:h-80 rounded-3xl overflow-hidden bg-black p-6 sm:p-7 flex flex-col justify-between shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <Image
                  src={rel.coverImageUrl || circuitImg}
                  alt={rel.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/15" />

                <div className="relative z-10">
                  <span className="inline-block px-4 py-1.5 rounded-full bg-[#FAF6ED]/95 text-[#5B1614] text-xs sm:text-sm font-editorial font-semibold shadow-sm">
                    {rel.date}
                  </span>
                </div>

                <div className="relative z-10 space-y-3.5">
                  <h4 className="font-editorial text-2xl sm:text-3xl font-bold text-white leading-tight">
                    {rel.title}
                  </h4>
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-editorial font-semibold bg-[#5B1614] text-[#FAF6ED] border border-white/10 group-hover:scale-105 transition-transform shadow-sm">
                    <span>{t.blog.readMore}</span>
                    <ChevronDown size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
