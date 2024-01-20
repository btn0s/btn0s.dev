import { Metadata } from "next";

import { getPosts } from "@/app/api/posts";

export const metadata: Metadata = {
  title: "thoughts | ✦ @btn0s",
  description:
    "This is essentially my blog. I use this space to write about my experiences, thoughts, and to document my learnings.",
  openGraph: {
    title: "thoughts | ✦ @btn0s",
    description:
      "This is essentially my blog. I use this space to write about my experiences, thoughts, and to document my learnings.",
    type: "website",
    url: "https://btn0s.dev/posts",
    images: [
      {
        url: "https://btn0s.dev/og-share.png",
        width: 1200,
        height: 630,
        alt: "btn0s.dev",
      },
    ],
  },
};

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
