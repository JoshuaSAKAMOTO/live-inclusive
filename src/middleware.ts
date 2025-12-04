import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const BASIC_AUTH_USER = process.env.BASIC_AUTH_USER || "admin";
const BASIC_AUTH_PASSWORD = process.env.BASIC_AUTH_PASSWORD || "password";

export function middleware(request: NextRequest) {
  // 本番環境でのみBasic認証を適用（環境変数で制御可能）
  if (process.env.ENABLE_BASIC_AUTH !== "true") {
    return NextResponse.next();
  }

  const authHeader = request.headers.get("authorization");

  if (authHeader) {
    const authValue = authHeader.split(" ")[1];
    const [user, password] = atob(authValue).split(":");

    if (user === BASIC_AUTH_USER && password === BASIC_AUTH_PASSWORD) {
      return NextResponse.next();
    }
  }

  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Secure Area"',
    },
  });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
