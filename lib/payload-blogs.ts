import { getPayload } from "payload";
import config from "@payload-config";
import {
  getBlogsByLang,
  getBlogPostBySlug as getFallbackPostBySlug,
  type BlogPost,
  type BlogSection,
} from "@/data/blogs";

export interface BlogCategoryOption {
  id: string;
  label: string;
}

function slugifyHeading(text: string, idx: number): string {
  const clean = text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return clean || `section-${idx + 1}`;
}

function formatEditorialDate(isoOrString?: string, lang: string = "es"): string {
  if (!isoOrString) {
    return lang === "en" ? "Saturday, June 14, 2026" : "Sábado 14 Junio 2026";
  }
  const parsed = new Date(isoOrString);
  if (Number.isNaN(parsed.getTime())) {
    return isoOrString;
  }

  if (lang === "en") {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(parsed);
  }

  const weekday = new Intl.DateTimeFormat("es-ES", { weekday: "long" }).format(
    parsed
  );
  const day = parsed.getDate();
  const month = new Intl.DateTimeFormat("es-ES", { month: "long" }).format(
    parsed
  );
  const year = parsed.getFullYear();

  const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
  return `${cap(weekday)} ${day} ${cap(month)} ${year}`;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapPayloadDocToBlogPost(doc: any, lang: string = "es"): BlogPost {
  const isEn = lang === "en";
  const categoryObj =
    doc.categoryItem && typeof doc.categoryItem === "object"
      ? doc.categoryItem
      : doc.category && typeof doc.category === "object"
        ? doc.category
        : null;
  const categorySlug = categoryObj?.slug
    ? String(categoryObj.slug)
    : typeof doc.category === "string"
      ? doc.category
      : "editorial";
  const categoryLabel = categoryObj
    ? String(
        isEn && categoryObj.name_en ? categoryObj.name_en : categoryObj.name
      )
    : "Editorial";

  const sections: BlogSection[] = Array.isArray(doc.sections)
    ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
      doc.sections.map((sec: any, idx: number) => {
        const heading = String(
          (isEn && sec.heading_en ? sec.heading_en : sec.heading) ||
            `Sección ${idx + 1}`
        );

        const rawContent = String(
          (isEn && sec.content_en ? sec.content_en : sec.content) || ""
        ).trim();

        const fromTextArea = rawContent
          ? rawContent
              .split(/\r?\n+/)
              .map((line) => line.trim())
              .filter(Boolean)
          : [];

        const fromLegacyArray: string[] = Array.isArray(sec.paragraphs)
          ? sec.paragraphs
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              .map((p: any) =>
                String((isEn && p.text_en ? p.text_en : p.text) || "").trim()
              )
              .filter(Boolean)
          : [];

        const paragraphs =
          fromTextArea.length > 0 ? fromTextArea : fromLegacyArray;

        const sectionImageObj =
          sec.sectionImage && typeof sec.sectionImage === "object"
            ? sec.sectionImage
            : null;

        const quoteText =
          isEn && sec.quoteText_en ? sec.quoteText_en : sec.quoteText;
        const quoteAuthor =
          isEn && sec.quoteAuthor_en
            ? sec.quoteAuthor_en
            : sec.quoteAuthor || (isEn ? "— Field note" : "— Nota de campo");

        return {
          id: slugifyHeading(heading, idx),
          number: String(sec.number || String(idx + 1).padStart(2, "0")),
          heading,
          paragraphs,
          imageUrl:
            sectionImageObj?.dataUrl || sectionImageObj?.url
              ? String(sectionImageObj.dataUrl || sectionImageObj.url)
              : undefined,
          imageAlt: sectionImageObj?.alt
            ? String(sectionImageObj.alt)
            : heading,
          imageCaption:
            isEn && sec.sectionImageCaption_en
              ? String(sec.sectionImageCaption_en)
              : sec.sectionImageCaption
                ? String(sec.sectionImageCaption)
                : undefined,
          quote: quoteText
            ? {
                text: String(quoteText),
                author: String(quoteAuthor),
              }
            : undefined,
        };
      })
    : [];

  const coverImageUrl =
    doc.coverImage &&
    typeof doc.coverImage === "object" &&
    (doc.coverImage.dataUrl || doc.coverImage.url)
      ? String(doc.coverImage.dataUrl || doc.coverImage.url)
      : undefined;

  const title = String(
    (isEn && doc.title_en ? doc.title_en : doc.title) || ""
  );
  const readTime = String(
    (isEn && doc.readTime_en ? doc.readTime_en : doc.readTime) ||
      (isEn ? "4 min read" : "Lectura de 4 minutos")
  );
  const excerpt = String(
    (isEn && doc.excerpt_en ? doc.excerpt_en : doc.excerpt) || ""
  );

  return {
    id: String(doc.id),
    slug: String(doc.slug),
    title,
    date: formatEditorialDate(
      doc.publishedAt || doc.publishedDate || doc.date,
      lang
    ),
    readTime,
    category: categorySlug,
    categoryLabel,
    excerpt,
    coverImageUrl,
    content: sections.flatMap((s) => s.paragraphs),
    sections,
    tags: Array.isArray(doc.tags)
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
        doc.tags.map((t: any) => String(t.tag || "")).filter(Boolean)
      : [],
    featured: Boolean(doc.featured),
    popular: Boolean(doc.popular),
    favorite: Boolean(doc.favorite),
  };
}

export async function getPublishedBlogPosts(
  lang: string = "es"
): Promise<BlogPost[]> {
  const fallbackPosts = getBlogsByLang(lang);
  if (!process.env.DATABASE_URL) {
    return fallbackPosts;
  }

  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: "posts",
      where: {
        status: {
          equals: "published",
        },
      },
      depth: 2,
      limit: 50,
      sort: "-publishedAt",
    });

    if (!result.docs || result.docs.length === 0) {
      return fallbackPosts;
    }

    return result.docs.map((doc) => mapPayloadDocToBlogPost(doc, lang));
  } catch {
    return fallbackPosts;
  }
}

export async function getBlogCategories(
  lang: string = "es"
): Promise<BlogCategoryOption[]> {
  if (!process.env.DATABASE_URL) {
    return [];
  }

  try {
    const isEn = lang === "en";
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: "categories",
      limit: 50,
      sort: "name",
    });

    if (!result.docs || result.docs.length === 0) {
      return [];
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return result.docs.map((cat: any) => ({
      id: String(cat.slug),
      label: String(isEn && cat.name_en ? cat.name_en : cat.name),
    }));
  } catch {
    return [];
  }
}

export async function getPublishedBlogPostBySlug(
  slug: string,
  lang: string = "es"
): Promise<BlogPost | undefined> {
  if (!process.env.DATABASE_URL) {
    return getFallbackPostBySlug(slug, lang);
  }

  try {
    const cleanSlug = decodeURIComponent(slug).trim();
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: "posts",
      where: {
        or: [
          {
            slug: {
              equals: cleanSlug,
            },
          },
          {
            slug: {
              like: cleanSlug,
            },
          },
        ],
      },
      depth: 2,
      limit: 1,
    });

    if (result.docs && result.docs.length > 0) {
      return mapPayloadDocToBlogPost(result.docs[0], lang);
    }

    return getFallbackPostBySlug(slug, lang);
  } catch {
    return getFallbackPostBySlug(slug, lang);
  }
}
