export type GitHubRepoApi = {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
  archived: boolean;
  topics: string[];
  pushed_at: string;
  private: boolean;
};

export type PortfolioRepo = {
  id: number;
  name: string;
  htmlUrl: string;
  description: string;
  homepage: string | null;
  language: string | null;
  tags: string[];
  stars: number;
  forks: number;
};

function mapRepo(r: GitHubRepoApi): PortfolioRepo {
  const tags = new Set<string>();
  if (r.language) tags.add(r.language);
  for (const t of r.topics) tags.add(t);
  return {
    id: r.id,
    name: r.name,
    htmlUrl: r.html_url,
    description: r.description?.trim() || "Public repository.",
    homepage: r.homepage && r.homepage.trim() !== "" ? r.homepage.trim() : null,
    language: r.language,
    tags: [...tags],
    stars: r.stargazers_count,
    forks: r.forks_count,
  };
}

/** Fetches public repositories for portfolio display (no database). */
export async function fetchPublicRepos(
  username: string,
): Promise<PortfolioRepo[]> {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
  };
  const token = process.env.GITHUB_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(
    `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&sort=pushed&type=owner`,
    {
      headers,
      next: { revalidate: 3600 },
    },
  );

  if (!res.ok) {
    console.error(`GitHub API error: ${res.status}`);
    return [];
  }

  const data = (await res.json()) as GitHubRepoApi[];
  return data
    .filter((r) => !r.fork && !r.private && !r.archived)
    .sort(
      (a, b) =>
        new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime(),
    )
    .map(mapRepo);
}
