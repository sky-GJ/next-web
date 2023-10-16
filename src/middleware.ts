import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // 如果要直接进行后台管理页面，为此进行判断
    if (!request.nextUrl.pathname.startsWith("/admin/login")) {
      // 非登录页面（loginView），判断是否带有 " token "
      if (request.cookies.get("admin-token")) {
        // 带有token，不做处理
      } else {
        // 否則跳转到loginView，进行登录验证
        return NextResponse.redirect(new URL("/admin/login", request.url));
      }
    }
  }
  //   return NextResponse.redirect(new URL("/home", request.url));
}

// See "Matching Paths" below to learn more
// export const config = {
//   matcher: "/about/:path*",
// };
