"use client";

import SpotifyAccentBackground from "@/components/spotify-accent-background";
import { useEffect, useState } from "react";
import { RepoCard } from "./repo-card";
import { GithubRepo } from "@/lib/get-repos";
import { ChevronLeft, ChevronRight, Github } from "lucide-react";

const REPOS_API = "/api/repos";
const REPOS_PER_PAGE = 6;

export default function Projects() {
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    const loadRepos = async () => {
      try {
        const response = await fetch(REPOS_API, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Projeler yuklenirken hata olustu.");
        }

        const data: GithubRepo[] = await response.json();
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
  const pageCount = Math.max(1, Math.ceil(repos.length / REPOS_PER_PAGE));

  const goToPage = (next: number) => {
    setPage(Math.min(Math.max(next, 0), pageCount - 1));
  };

  return (
    <div className="relative isolate flex h-full w-full flex-col overflow-auto rounded-lg border border-border p-6 md:p-12">
      <SpotifyAccentBackground className="opacity-70" />

      <div className="relative z-10 mx-auto w-full max-w-4xl pt-10 pb-2 md:pt-2">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl md:text-2xl font-bold">Projects</h2>
            <p className="text-sm text-foreground/60 mt-1">
              My public work on GitHub.
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
            {Array.from({ length: REPOS_PER_PAGE }).map((_, i) => (
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
          <>
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
                style={{ transform: `translateX(-${page * 100}%)` }}
              >
                {Array.from({ length: pageCount }).map((_, i) => (
                  <div
                    key={i}
                    className="grid w-full shrink-0 grid-cols-1 gap-4 px-0.5 md:grid-cols-2 md:gap-6"
                  >
                    {repos
                      .slice(i * REPOS_PER_PAGE, i * REPOS_PER_PAGE + REPOS_PER_PAGE)
                      .map((repo) => (
                        <RepoCard key={repo.id} repo={repo} />
                      ))}
                  </div>
                ))}
              </div>
            </div>

            {pageCount > 1 && (
              <div className="mt-6 flex items-center justify-center gap-3">
                <button
                  onClick={() => goToPage(page - 1)}
                  disabled={page === 0}
                  aria-label="Previous page"
                  className="rounded-full border border-border p-1.5 text-foreground/70 transition hover:text-foreground disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <ChevronLeft size={16} />
                </button>

                <div className="flex items-center gap-2">
                  {Array.from({ length: pageCount }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goToPage(i)}
                      aria-label={`Page ${i + 1}`}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        page === i
                          ? "w-5 bg-accent"
                          : "w-2 bg-foreground/25 hover:bg-foreground/50"
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => goToPage(page + 1)}
                  disabled={page === pageCount - 1}
                  aria-label="Next page"
                  className="rounded-full border border-border p-1.5 text-foreground/70 transition hover:text-foreground disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
