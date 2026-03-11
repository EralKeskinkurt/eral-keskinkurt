"use client";

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
        if (controller.signal.aborted) {
          return;
        }

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

    return () => {
      controller.abort();
    };
  }, []);

  const showEmptyState = !loading && !error && repos.length === 0;

  return (
    <div className="flex items-center justify-center border border-border rounded-lg w-full h-full p-12">
      <div className="flex flex-col md:flex-row items-start w-full h-full justify-start gap-18 overflow-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 w-full">
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
