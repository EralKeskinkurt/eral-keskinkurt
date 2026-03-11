import { GithubPinnedRepo } from "@/lib/get-repos";

type Props = {
  repo: GithubPinnedRepo;
};

export function RepoCard({ repo }: Props) {
  return (
    <a
      href={repo.url}
      target="_blank"
      className="group flex flex-col items-start justify-between border border-border rounded-xl p-5 hover:bg-muted transition w-full h-40"
      style={{ backgroundColor: repo.primaryLanguage?.color + "10" }}
    >
      <h3 className="font-semibold text-lg group-hover:text-foreground/70">
        {repo.name}
      </h3>

      <p className="text-sm text-foreground/60 mt-2 line-clamp-2">
        {repo.description ? repo.description : "No description provided."}
      </p>

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
