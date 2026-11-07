import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["es", "en"] as const;
const defaultLocale = "es";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/media") ||
    pathname === "/sitemap.xml" ||
    pathname === "/robots.txt"
  ) {
    return NextResponse.next();
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  // Temporarily redirect /blogs routes back to the home page while the blog is hidden
  if (
    pathname === "/blogs" ||
    pathname.startsWith("/blogs/") ||
    locales.some(
      (locale) =>
        pathname === `/${locale}/blogs` ||
        pathname.startsWith(`/${locale}/blogs/`),
    )
  ) {
    const matchedLocale =
      locales.find(
        (locale) =>
          pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
      ) || defaultLocale;
    return NextResponse.redirect(new URL(`/${matchedLocale}`, request.url));
  }

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // Check saved cookie preference or fallback to default locale
  const cookieLocale = request.cookies.get("lang-selected")?.value;
  let targetLocale = defaultLocale;

  if (cookieLocale && (locales as readonly string[]).includes(cookieLocale)) {
    targetLocale = cookieLocale;
  } else {
    const acceptLanguage = request.headers.get("accept-language");
    if (acceptLanguage && acceptLanguage.toLowerCase().includes("en")) {
      targetLocale = "en";
    }
  }

  // Redirect to localized URL preserving query string
  const cleanPath =
    pathname === "/"
      ? ""
      : pathname.startsWith("/")
        ? pathname
        : `/${pathname}`;
  const redirectUrl = new URL(`/${targetLocale}${cleanPath}`, request.url);
  redirectUrl.search = request.nextUrl.search;

  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: [
    // Skip static assets, Payload admin/api/media, Next.js internals, and files with extensions
    "/((?!api|admin|media|sitemap\\.xml|robots\\.txt|_next/static|_next/image|assets|videos|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ttf|woff|woff2|ico|mp4|webm|ogg|mp3|wav|mov|m4v|xml|txt)$).*)",
  ],
};
