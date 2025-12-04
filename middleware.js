import { NextResponse } from "next/server";

export function middleware(request) {
  const response = NextResponse.next();

  const allowedOrigins = process.env.CORS_ORIGINS?.split(",") || ["*"];
  const origin = request.headers.get("origin") || "";

  if (allowedOrigins.includes("*") || allowedOrigins.includes(origin)) {
    response.headers.set("Access-Control-Allow-Origin", origin || "*");
  }

  response.headers.set("Access-Control-Allow-Credentials", "true");
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,DELETE,OPTIONS"
  );
  response.headers.set("Access-Control-Allow-Headers", "*");

  if (request.method === "OPTIONS") {
    return new NextResponse(null, { status: 200, headers: response.headers });
  }

  return response;
}

export const config = {
  matcher: "/api/:path*",
};
