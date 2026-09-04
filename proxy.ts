import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["es", "en"] as const;
const defaultLocale = "es";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // Check saved cookie preference or fallback to default locale
  const cookieLocale = request.cookies.get("portfolio_lang")?.value;
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
  const cleanPath = pathname === "/" ? "" : (pathname.startsWith("/") ? pathname : `/${pathname}`);
  const redirectUrl = new URL(
    `/${targetLocale}${cleanPath}`,
    request.url
  );
  redirectUrl.search = request.nextUrl.search;

  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: [
    // Skip static assets, Next.js internals, and files with extensions
    "/((?!api|_next/static|_next/image|assets|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ttf|woff|woff2|ico)$).*)",
  ],
};
