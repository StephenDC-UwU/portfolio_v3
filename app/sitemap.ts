import type { MetadataRoute } from "next";
import { getPublishedBlogPosts } from "@/lib/payload-blogs";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = (
    process.env.NEXT_PUBLIC_SITE_URL || "https://thefilimisco.com"
  ).replace(/\/$/, "");

  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/es`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: {
          es: `${baseUrl}/es`,
          en: `${baseUrl}/en`,
        },
      },
    },
    {
      url: `${baseUrl}/en`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: {
          es: `${baseUrl}/es`,
          en: `${baseUrl}/en`,
        },
      },
    },
    {
      url: `${baseUrl}/es/blogs`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
      alternates: {
        languages: {
          es: `${baseUrl}/es/blogs`,
          en: `${baseUrl}/en/blogs`,
        },
      },
    },
    {
      url: `${baseUrl}/en/blogs`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
      alternates: {
        languages: {
          es: `${baseUrl}/es/blogs`,
          en: `${baseUrl}/en/blogs`,
        },
      },
    },
  ];

  const posts = await getPublishedBlogPosts("es");

  const blogRoutes: MetadataRoute.Sitemap = posts.flatMap((post) => {
    const encodedSlug = encodeURIComponent(post.slug);
    return [
      {
        url: `${baseUrl}/es/blogs/${encodedSlug}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.8,
        alternates: {
          languages: {
            es: `${baseUrl}/es/blogs/${encodedSlug}`,
            en: `${baseUrl}/en/blogs/${encodedSlug}`,
          },
        },
      },
      {
        url: `${baseUrl}/en/blogs/${encodedSlug}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.8,
        alternates: {
          languages: {
            es: `${baseUrl}/es/blogs/${encodedSlug}`,
            en: `${baseUrl}/en/blogs/${encodedSlug}`,
          },
        },
      },
    ];
  });

  return [...staticRoutes, ...blogRoutes];
}

