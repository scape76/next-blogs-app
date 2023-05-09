import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    const pathname = req.nextUrl.pathname;

    const isAuth = await getToken({ req });
    const signInPage = "/login";
    const isLoginPage = signInPage ? pathname.startsWith(signInPage) : false;

    const sensetiveRoutes = ["/profile", "/editor"];
    const isAccessingSensetiveRoute = sensetiveRoutes.some((route) =>
      pathname.startsWith(route)
    );

    if (isLoginPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL("/", req.url));
      }

      return NextResponse.next();
    }

    if (!isAuth && isAccessingSensetiveRoute) {
      if (!signInPage) {
        return NextResponse.redirect(new URL("/", req.url));
      }
      return NextResponse.redirect(new URL(signInPage, req.url));
    }
  },
  {
    callbacks: {
      async authorized() {
        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/", "/login", "/profile/:path*", "/editor/:path*"],
};
