export type GithubRepo = {
  id: string;
  name: string;
  description: string | null;
  url: string;
  stargazerCount: number;
  forkCount: number;
  primaryLanguage: {
    name: string;
    color: string;
  } | null;
};

export async function getPublicRepos(): Promise<GithubRepo[]> {
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
      {
        viewer {
          login
          repositories(
            first: 100
            privacy: PUBLIC
            ownerAffiliations: OWNER
            isFork: false
            orderBy: { field: UPDATED_AT, direction: DESC }
          ) {
            nodes {
              id
              name
              description
              url
              stargazerCount
              forkCount
              primaryLanguage {
                name
                color
              }
            }
          }
        }
      }
      `,
    }),
    next: { revalidate: 3600 },
  });

  const json = await res.json();

  if (json.errors) {
    console.error(json.errors);
    return [];
  }

  const { login, repositories } = json.data.viewer;

  // The profile README repo (same name as the username) isn't a project.
  return repositories.nodes.filter(
    (repo: GithubRepo) => repo.name.toLowerCase() !== login.toLowerCase(),
  );
}
