"use server";

import { deleteSession } from "@/lib/session";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await deleteSession();

  revalidatePath("/");

  const url = new URL("/session-ended", req.nextUrl);
  url.searchParams.set("cache", "1");

  return NextResponse.redirect(url);
}
