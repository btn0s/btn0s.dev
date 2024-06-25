import { Metadata } from "next";
import Link from "next/link";

import { getNotes } from "@/app/api/notes";
import FadeBlurLoader from "@/components/FadeBlurLoader";
import { ListCard } from "@/components/ListCard";
import { List } from "@/components/pages/List";

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
  const notes = await getNotes();
  return (
    <div className="not-prose flex flex-col gap-12">
      <h1 className="text-balance text-xl text-white">
        <span className="font-light opacity-50">Random thoughts, notes, </span>
        <span className="font-bold">and ideas.</span>
      </h1>
      {notes.length === 0 ? (
        <div className="flex gap-2 text-center text-sm">
          {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
          <span className="text-white/50">// check back later</span>
        </div>
      ) : (
        <List>
          {notes.map(({ meta, slug }) => (
            <ListCard key={slug} meta={meta} slug={slug} section="notes" />
          ))}
        </List>
      )}
    </div>
  );
};

export default Page;
