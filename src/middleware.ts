import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const BASIC_AUTH_ENABLED = process.env.BASIC_AUTH_ENABLED === "true";
const STAGING_MODE = process.env.STAGING_MODE === "true";
const USER = "gdp2026";
const PASS = "gdp2026";

const STAGING_BLOCKED = ["/lp/indie-label", "/lp/productphoto"];

export function middleware(req: NextRequest) {
  if (STAGING_MODE) {
    const path = req.nextUrl.pathname;
    if (STAGING_BLOCKED.some((p) => path === p || path.startsWith(p + "/"))) {
      return new NextResponse(null, { status: 404 });
    }
  }

  if (!BASIC_AUTH_ENABLED) return NextResponse.next();

  const auth = req.headers.get("authorization");
  if (auth?.startsWith("Basic ")) {
    const decoded = atob(auth.slice(6));
    const colon = decoded.indexOf(":");
    if (
      colon !== -1 &&
      decoded.slice(0, colon) === USER &&
      decoded.slice(colon + 1) === PASS
    ) {
      return NextResponse.next();
    }
  }

  return new NextResponse("Unauthorized", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Staging"' },
  });
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|css|js|woff2?|ttf|otf)$).*)",
  ],
};
