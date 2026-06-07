import { NextResponse } from "next/server";
import { fetchWakatimeStats } from "@/lib/wakatime";

export const revalidate = 3600;

export async function GET() {
  const data = await fetchWakatimeStats();
  if (!data) {
    return NextResponse.json(null, { status: 503 });
  }
  return NextResponse.json(data);
}
