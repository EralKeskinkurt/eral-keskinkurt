export type GithubPinnedRepo = {
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

export async function getPinnedRepos(): Promise<GithubPinnedRepo[]> {
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
          pinnedItems(first: 6, types: REPOSITORY) {
            nodes {
              ... on Repository {
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

  return json.data.viewer.pinnedItems.nodes;
}
