import { NextRequest, NextResponse } from "next/server";
import { createNewCart } from "./lib/swag-store/cart";
import { SWAG_STORE_CONSTANTS } from "./lib/swag-store/constants";

export default async function proxy(req: NextRequest) {
  const res = NextResponse.next();
  // read cookie from request
  const cookie = req.cookies.get(SWAG_STORE_CONSTANTS.CART_TOKEN_COOKIE_NAME);
  if (!cookie) {
    const cartToken = await createNewCart();
    res.cookies.set(
      SWAG_STORE_CONSTANTS.CART_TOKEN_COOKIE_NAME,
      cartToken.token,
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 1, // 1 days
        sameSite: "strict",
      }
    );
  }

  
  // Security headers
  res.headers.set('X-Frame-Options', 'DENY')
  res.headers.set('X-Content-Type-Options', 'nosniff')
  
  return res;
}

export const config = {
  /*
   * Match all paths except for:
   * 1. API route handlers
   * 2. /_next (Next.js internals)
   * 3. /healthz (Health check)
   * 4. all root files inside /public
   */
  matcher: [
    "/",
    "/((?!api/|sitemap.xml|robots.txt|_next/|healthz|manifest.json|vercel.svg|favicon.ico).*)",
  ],
};
