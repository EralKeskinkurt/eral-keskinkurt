import { NextResponse } from "next/server";

import { getPublicRepos } from "@/lib/get-repos";

export async function GET() {
  const repos = await getPublicRepos();
  return NextResponse.json(repos);
}
