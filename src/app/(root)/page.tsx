import PageContent from "@/components/layout/PageContent";
import { profileData } from "@/data/mock";
import { fetchPublicRepos } from "@/lib/github";

export default async function Home() {
  const repos = await fetchPublicRepos(profileData.username);

  return (
    <PageContent
      repos={repos.slice(0, 3)}
      githubUsername={profileData.username}
    />
  );
}
