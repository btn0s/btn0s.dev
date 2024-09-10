import { Metadata } from "next";

import { POSTS_QUERY } from "@/app/work/queries";
import EmptyPageMessage from "@/components/EmptyPageMessage";
import Gallery from "@/components/Gallery";
import { createMetaTitle } from "@/lib/utils";
import { client } from "@/sanity/lib/client";

const TITLE = "work";
const DESCRIPTION =
  "My curriculum vitae, in a way. A selection of projects I've worked on.";

export const metadata: Metadata = {
  title: createMetaTitle(TITLE),
  description: DESCRIPTION,
  openGraph: {
    title: createMetaTitle(TITLE),
    description: DESCRIPTION,
    type: "website",
    url: "https://btn0s.dev/work",
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
  const posts = await client.fetch(
    POSTS_QUERY,
    {},
    {
      next: { revalidate: 5 },
    },
  );

  console.log({ posts });

  const sortedPosts = posts.sort((a, b) => {
    if (!a.startDate || !b.startDate) return -1;

    if (a.startDate < b.startDate) {
      return 1;
    }

    if (a.startDate > b.startDate) {
      return -1;
    }

    return 0;
  });

  return (
    <div className="not-prose flex flex-col gap-12">
      <h1 className="text-xl text-white">
        <span className="font-light opacity-50">the journey so far, </span>
        <div className="font-bold">putting in the work</div>
      </h1>
      {sortedPosts.length === 0 ? (
        <EmptyPageMessage />
      ) : (
        <Gallery posts={sortedPosts} singleColumn />
      )}
    </div>
  );
};

export default Page;
