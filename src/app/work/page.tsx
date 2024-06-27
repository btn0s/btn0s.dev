import { Metadata } from "next";

import { getEntries } from "@/app/api/entries";
import EmptyPageMessage from "@/components/EmptyPageMessage";
import EntriesGallery from "@/components/Gallery";
import { List } from "@/components/List";
import { ListCard } from "@/components/ListCard";
import { createMetaTitle } from "@/lib/utils";
import { EntryType } from "@/types";

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
        url: "https://btn0s.dev/og-share-new.png",
        width: 1200,
        height: 630,
        alt: "btn0s.dev",
      },
    ],
  },
};

const Page = async () => {
  const entries = await getEntries(EntryType.WORK);

  const sortedEntries = entries.sort((a, b) => {
    // sort by start date, descending
    if (a.meta.startDate < b.meta.startDate) {
      return 1;
    }

    if (a.meta.startDate > b.meta.startDate) {
      return -1;
    }

    return 0;
  });

  return (
    <div className="not-prose flex flex-col gap-12">
      <h1 className="text-xl text-white">
        <span className="font-light opacity-50">the journey so far, </span>
        <div className="font-bold">this is my life&apos;s work</div>
      </h1>
      {sortedEntries.length === 0 ? (
        <EmptyPageMessage />
      ) : (
        <EntriesGallery entries={sortedEntries} singleColumn />
      )}
    </div>
  );
};

export default Page;
