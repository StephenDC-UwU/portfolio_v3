import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = (
    process.env.NEXT_PUBLIC_SITE_URL || "https://thefilimisco.com"
  ).replace(/\/$/, "");

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/", "/es/blogs", "/en/blogs", "/blogs"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

