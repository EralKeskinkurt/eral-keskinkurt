import { Star, GitFork } from "lucide-react";
import { GithubRepo } from "@/lib/get-repos";

type Props = {
  repo: GithubRepo;
};

export function RepoCard({ repo }: Props) {
  const languageColor = repo.primaryLanguage?.color ?? "var(--border)";

  return (
    <a
      href={repo.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col justify-between overflow-hidden border border-border rounded-xl p-4 md:p-5 hover:bg-muted/10 hover:border-foreground/30 hover:shadow-lg transition-all duration-300 w-full min-h-[150px] hover:-translate-y-1"
    >
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1 opacity-70 transition-opacity duration-300 group-hover:opacity-100"
        style={{ backgroundColor: languageColor }}
      />

      <div>
        <h3 className="font-semibold text-base md:text-lg transition-colors group-hover:text-accent">
          {repo.name}
        </h3>

        <p className="text-sm text-foreground/60 mt-2 line-clamp-2">
          {repo.description || "No description provided."}
        </p>
      </div>

      <div className="flex items-center gap-4 mt-4 text-xs md:text-sm text-foreground/70">
        {repo.primaryLanguage && (
          <div className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: repo.primaryLanguage.color }}
            />
            {repo.primaryLanguage.name}
          </div>
        )}

        {repo.stargazerCount > 0 && (
          <div className="flex items-center gap-1">
            <Star size={14} />
            {repo.stargazerCount}
          </div>
        )}

        {repo.forkCount > 0 && (
          <div className="flex items-center gap-1">
            <GitFork size={14} />
            {repo.forkCount}
          </div>
        )}
      </div>
    </a>
  );
}
