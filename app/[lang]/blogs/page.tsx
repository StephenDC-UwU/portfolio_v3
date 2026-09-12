import type { Metadata } from "next";
import { ES } from "@/dictionaries/es";
import { EN } from "@/dictionaries/en";
import BlogsPage from "./BlogsPage";


interface BlogsPageProps {
  params: Promise<{
    lang: string;
  }>;
}

export async function generateStaticParams() {
  return [{ lang: "es" }, { lang: "en" }];
}

export async function generateMetadata({
  params,
}: BlogsPageProps): Promise<Metadata> {
  const { lang } = await params;
  const dictionary = lang === "en" ? EN : ES;

  return {
    title: dictionary.blog.seoTitle,
    description: dictionary.blog.seoDescription,
    openGraph: {
      title: dictionary.blog.seoTitle,
      description: dictionary.blog.seoDescription,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: dictionary.blog.seoTitle,
      description: dictionary.blog.seoDescription,
    },
  };
}

export default function Blogs() {
  return <BlogsPage />;
}
