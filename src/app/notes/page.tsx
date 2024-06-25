import { Metadata } from "next";
import Link from "next/link";

import { getNotes } from "@/app/api/notes";
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
  const notes = await getNotes();
  return (
    <FadeBlurLoader
      className="not-prose flex flex-col gap-12"
      transition={{ delay: 0.25 }}
    >
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
        <div className="flex flex-col gap-2">
          {notes.map(({ meta, slug }) => (
            <Link
              key={slug}
              href={`/notes/${slug}`}
              className="flex flex-col gap-1 rounded-md border border-border bg-white/5 p-3 text-sm transition-colors duration-200 hover:bg-white/10"
            >
              <h3 className="text-white">{meta.title}</h3>
              <p className="max-w-[95%] text-pretty text-xs text-muted-foreground">
                {meta.description}
              </p>
            </Link>
          ))}
        </div>
      )}
    </FadeBlurLoader>
  );
};

export default Page;
