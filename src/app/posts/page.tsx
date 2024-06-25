import { Metadata } from "next";

import { getPosts } from "@/app/api/posts";
import FadeBlurLoader from "@/components/FadeBlurLoader";

export const metadata: Metadata = {
  title: "✦ thoughts | @btn0s",
  description: "I don't write a lot. When I do it ends up here.",
  openGraph: {
    title: "✦ thoughts | @btn0s",
    description: "I don't write a lot. When I do it ends up here.",
    type: "website",
    url: "https://btn0s.dev/posts",
    images: [
      {
        url: "https://btn0s.dev/og-share-new.png",
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
    <FadeBlurLoader
      className="not-prose flex flex-col gap-12"
      transition={{ delay: 0.25 }}
    >
      <h1 className="text-xl text-white">
        <span className="font-light opacity-50">
          I don&apos;t write a lot,{" "}
        </span>
        <span className="font-bold">but when I do it ends up here.</span>
      </h1>
      {posts.map((post) => post.meta.title)}
      {posts.length === 0 && (
        <div className="flex gap-2 text-center text-sm">
          <span className="text-white">no thoughts, head empty</span>
          {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
          <span className="text-muted-foreground">// check back later</span>
        </div>
      )}
    </FadeBlurLoader>
  );
};

export default Page;
