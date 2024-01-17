import { getPosts } from "@/app/api/posts";

const Page = async () => {
  const posts = await getPosts();
  return (
    <div className="flex flex-col gap-12">
      <p>
        Here&apos;s a small peek into my brain. I write about design,
        programming, and other things that interest me.
      </p>
      <p>
        {posts.length} {posts.length === 1 ? "post" : "posts"}
      </p>
      {posts.map((post) => post.metadata.title)}
    </div>
  );
};

export default Page;
