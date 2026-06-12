"use client";

import SpotifyAccentBackground from "@/components/spotify-accent-background";
import { useEffect, useState } from "react";
import { RepoCard } from "./repo-card";
import { GithubPinnedRepo } from "@/lib/get-repos";

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
    <div className="relative isolate flex h-full w-full items-center justify-center overflow-auto rounded-lg border border-border p-6 md:p-12">
      <SpotifyAccentBackground className="opacity-70" />

      <div className="relative z-10 w-full max-w-4xl pt-10 pb-2 md:pt-2">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
          {error ? (
            <p className="text-sm">{error}</p>
          ) : loading ? (
            <p className="text-sm">Projects loading...</p>
          ) : showEmptyState ? (
            <p className="text-sm">There are no projects to be shown yet.</p>
          ) : (
            repos.map((repo) => <RepoCard key={repo.id} repo={repo} />)
          )}
        </div>
      </div>
    </div>
  );
}
