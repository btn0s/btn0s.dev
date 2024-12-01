import { Metadata } from "next";

import { getEntries } from "@/app/api/entries";
import Gallery from "@/components/gallery";
import { List } from "@/components/list";
import { createMetaTitle } from "@/lib/utils";
import { EntryType } from "@/types";

import EmptyPageMessage from "@/components/EmptyPageMessage";
import { ListCard } from "@/components/ListCard";

const TITLE = "experiments";
const DESCRIPTION =
  "My laboratory. A collection of experiments and prototypes.";

export const metadata: Metadata = {
  title: createMetaTitle(TITLE),
  description: DESCRIPTION,
  openGraph: {
    title: createMetaTitle(TITLE),
    description: DESCRIPTION,
    type: "website",
    url: "https://btn0s.dev/lab",
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
  const entries = await getEntries(EntryType.LAB);

  const sortedEntries = entries.sort((a, b) => {
    if (!a.meta.createdAt || !b.meta.createdAt) return -1;
    if (a.meta.createdAt < b.meta.createdAt) return 1;
    if (a.meta.createdAt > b.meta.createdAt) return -1;
    return 0;
  });

  return (
    <div className="not-prose flex flex-col gap-12">
      <h1 className="text-xl text-white">
        <span className="font-light opacity-50">
          a selection of experiments{" "}
        </span>
        <div className="font-bold">from the lab</div>
      </h1>
      {sortedEntries.length === 0 ? (
        <EmptyPageMessage />
      ) : (
        <Gallery
          entries={sortedEntries}
          singleColumn={sortedEntries.length < 6}
        />
      )}
    </div>
  );
};

export default Page;
