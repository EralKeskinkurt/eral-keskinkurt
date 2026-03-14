import { GithubPinnedRepo } from "@/lib/get-repos";

type Props = {
  repo: GithubPinnedRepo;
};

export function RepoCard({ repo }: Props) {
  return (
    <a
      href={repo.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col justify-between border border-border rounded-xl p-4 md:p-5 hover:bg-muted transition-all duration-300 w-full min-h-[140px] hover:-translate-y-1"
      style={{
        backgroundColor: repo.primaryLanguage?.color
          ? repo.primaryLanguage.color + "10"
          : undefined,
      }}
    >
      <div>
        <h3 className="font-semibold text-base md:text-lg group-hover:text-foreground/80">
          {repo.name}
        </h3>

        <p className="text-sm text-foreground/60 mt-2 line-clamp-2">
          {repo.description || "No description provided."}
        </p>
      </div>

      <div className="flex items-center gap-4 mt-4 text-sm">
        {repo.primaryLanguage && (
          <div className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: repo.primaryLanguage.color }}
            />
            {repo.primaryLanguage.name}
          </div>
        )}
      </div>
    </a>
  );
}
