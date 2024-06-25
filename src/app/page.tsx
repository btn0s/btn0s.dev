import { getExperiments } from "@/app/api/experiments";
import { getPosts } from "@/app/api/posts";
import Home from "@/components/pages/home";

export default async function Page() {
  const posts = await getPosts();
  const experiments = await getExperiments();

  return <Home posts={posts} experiments={experiments} />;
}
