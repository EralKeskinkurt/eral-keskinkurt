"use client";

import SpotifyAccentBackground from "@/components/spotify-accent-background";
import { useEffect, useState } from "react";
import { RepoCard } from "./repo-card";
import { GithubPinnedRepo } from "@/lib/get-repos";
import { Github } from "lucide-react";

const PINNED_REPOS_API = "/api/pinned-repos";

export default function Projects() {
  const [repos, setRepos] = useState<GithubPinnedRepo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const loadRepos = async () => {
      try {
        const response = await fetch(PINNED_REPOS_API, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Projeler yuklenirken hata olustu.");
        }

        const data: GithubPinnedRepo[] = await response.json();
        setRepos(data);
      } catch (caught) {
        if (controller.signal.aborted) return;

        setError(
          caught instanceof Error
            ? caught.message
            : "Projeler yuklenirken beklenmeyen bir hata olustu.",
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    loadRepos();

    return () => controller.abort();
  }, []);

  const showEmptyState = !loading && !error && repos.length === 0;

  return (
    <div className="relative isolate flex h-full w-full flex-col overflow-auto rounded-lg border border-border p-6 md:p-12">
      <SpotifyAccentBackground className="opacity-70" />

      <div className="relative z-10 mx-auto w-full max-w-4xl pt-10 pb-2 md:pt-2">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl md:text-2xl font-bold">Projects</h2>
            <p className="text-sm text-foreground/60 mt-1">
              A few things I&apos;ve pinned on GitHub.
            </p>
          </div>

          <a
            href="https://github.com/EralKeskinkurt"
            target="_blank"
            rel="noopener noreferrer"
            className="flex shrink-0 items-center gap-2 text-sm text-foreground/70 transition hover:text-foreground"
          >
            <Github size={18} />
            <span className="hidden sm:inline">View all</span>
          </a>
        </div>

        {error ? (
          <p className="text-sm text-red-500">{error}</p>
        ) : loading ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="min-h-[150px] animate-pulse rounded-xl border border-border p-4 md:p-5"
              >
                <div className="h-4 w-2/3 rounded bg-foreground/10" />
                <div className="mt-3 h-3 w-full rounded bg-foreground/10" />
                <div className="mt-2 h-3 w-4/5 rounded bg-foreground/10" />
              </div>
            ))}
          </div>
        ) : showEmptyState ? (
          <p className="text-sm text-foreground/60">
            There are no projects to be shown yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
            {repos.map((repo) => (
              <RepoCard key={repo.id} repo={repo} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
