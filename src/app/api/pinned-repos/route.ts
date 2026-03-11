import { NextResponse } from "next/server";

import { getPinnedRepos } from "@/lib/get-repos";

export async function GET() {
  const repos = await getPinnedRepos();
  return NextResponse.json(repos);
}
