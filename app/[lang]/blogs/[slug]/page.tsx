import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, Sparkles, Tag, Code2, ArrowRight, Compass } from "lucide-react";

import Navbar from "@/components/navbar/Navbar";
import { getBlogPostBySlug, blogPosts } from "@/data/blogs";
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
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: "Blog Post Not Found" };
  return {
    title: `${post.title} | Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { lang, slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Find next and previous posts
  const currentIndex = blogPosts.findIndex((p) => p.slug === post.slug);
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;

  return (
    <div className="relative min-h-screen w-full bg-bg-primary text-text-primary overflow-x-hidden transition-colors duration-500">
      {/* Floating Navigation */}
      <Navbar />

      {/* Main Container */}
      <main className="max-w-4xl mx-auto px-4 sm:px-8 md:px-12 pt-28 sm:pt-36 pb-20 space-y-10 sm:space-y-12">

        {/* Breadcrumb & Navigation Bar */}
        <div className="flex items-center justify-between gap-4 flex-wrap pb-4 border-b border-current/10">
          <Link
            href={`/${lang}/blogs`}
            className="group inline-flex items-center gap-2 text-xs font-cinzel tracking-wider uppercase font-semibold text-text-primary/70 hover:text-text-primary transition-colors cursor-pointer"
          >
            <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" />
            <span>Volver a Blogs</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-current/5 border border-current/15 text-[11px] font-cinzel font-bold uppercase tracking-wider">
              <Sparkles size={11} className="text-accent" />
              {post.categoryLabel}
            </span>
          </div>
        </div>

        {/* Article Header (Title & Metadata) */}
        <header className="space-y-6">
          <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
            {post.title}
          </h1>

          <p className="font-editorial text-xl sm:text-2xl italic opacity-85 leading-relaxed font-light max-w-3xl">
            {post.excerpt}
          </p>

          <div className="flex items-center gap-4 sm:gap-6 flex-wrap text-xs font-cinzel opacity-70 pt-2 border-t border-current/10">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} />
              {post.readTime}
            </span>
            <span className="flex items-center gap-1.5">
              <Compass size={14} />
              Por The Filimisco
            </span>
          </div>
        </header>

        {/* Featured Cover Banner */}
        <div className="relative w-full h-64 sm:h-96 md:h-[450px] rounded-3xl overflow-hidden glass-card border border-current/15 shadow-2xl bg-black/40">
          <Image
            src={circuitImg}
            alt={post.title}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 text-white/90 text-xs font-cinzel tracking-widest uppercase flex items-center justify-between">
            <span>Visual Artwork // {post.categoryLabel}</span>
            <span className="opacity-60">{post.slug}</span>
          </div>
        </div>

        {/* Article Prose Content */}
        <article className="space-y-6 font-editorial text-lg sm:text-2xl leading-relaxed opacity-90 font-light pt-4">
          {post.content.map((paragraph, index) => (
            <p
              key={index}
              className={
                index === 0
                  ? "first-letter:font-editorial first-letter:text-6xl sm:first-letter:text-7xl first-letter:float-left first-letter:mr-4 first-letter:font-bold first-letter:leading-none text-text-primary"
                  : ""
              }
            >
              {paragraph}
            </p>
          ))}

          {/* Code Snippet Box (if available) */}
          {post.codeSnippet && (
            <div className="my-8 rounded-2xl overflow-hidden shadow-xl border border-white/10 bg-black/90 text-emerald-400 p-5 sm:p-6 font-mono text-xs sm:text-sm space-y-3">
              <div className="flex items-center justify-between text-[11px] text-white/60 font-cinzel uppercase tracking-widest border-b border-white/10 pb-2">
                <span className="flex items-center gap-2">
                  <Code2 size={14} className="text-emerald-400" />
                  Code Manifest // TypeScript
                </span>
                <span className="opacity-50">src/manifest.ts</span>
              </div>
              <pre className="overflow-x-auto leading-relaxed py-2">
                {post.codeSnippet}
              </pre>
            </div>
          )}
        </article>

        {/* Tags Row */}
        <div className="pt-6 border-t border-current/10 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            <Tag size={15} className="opacity-60" />
            {post.tags.map((tag, i) => (
              <span
                key={i}
                className="text-xs font-mono px-3 py-1 rounded-lg bg-current/5 border border-current/10 font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="text-xs font-cinzel opacity-60">
            Escrito con devoción artística & código
          </div>
        </div>

        {/* Next & Previous Article Navigation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-10 border-t border-current/10">
          {prevPost ? (
            <Link
              href={`/${lang}/blogs/${prevPost.slug}`}
              className="group p-5 sm:p-6 rounded-2xl glass-card border border-current/10 hover:border-current/30 transition-all hover:-translate-y-1 flex flex-col justify-between space-y-3 cursor-pointer"
            >
              <span className="text-[10px] font-cinzel uppercase tracking-widest opacity-60 flex items-center gap-1">
                <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" />
                Artículo Anterior
              </span>
              <h4 className="font-editorial text-lg sm:text-xl font-bold tracking-tight group-hover:text-accent transition-colors">
                {prevPost.title}
              </h4>
            </Link>
          ) : (
            <div className="hidden sm:block" />
          )}

          {nextPost && (
            <Link
              href={`/${lang}/blogs/${nextPost.slug}`}
              className="group p-5 sm:p-6 rounded-2xl glass-card border border-current/10 hover:border-current/30 transition-all hover:-translate-y-1 flex flex-col justify-between space-y-3 text-right cursor-pointer"
            >
              <span className="text-[10px] font-cinzel uppercase tracking-widest opacity-60 flex items-center justify-end gap-1">
                Siguiente Artículo
                <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
              </span>
              <h4 className="font-editorial text-lg sm:text-xl font-bold tracking-tight group-hover:text-accent transition-colors">
                {nextPost.title}
              </h4>
            </Link>
          )}
        </div>
      </main>
    </div>
  );
}
