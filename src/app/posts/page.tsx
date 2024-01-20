import { getPosts } from "@/app/api/posts";

const Page = async () => {
  const posts = await getPosts();
  return (
    <div className="flex flex-col gap-12">
      <p>
        This is essentially my blog. I use this space to write about my
        experiences, thoughts, and to document my learnings.
      </p>
      <p>
        {posts.length} {posts.length === 1 ? "post" : "posts"}
      </p>
      {posts.map((post) => post.meta.title)}
    </div>
  );
};

export default Page;
