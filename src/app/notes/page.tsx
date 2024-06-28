import { Metadata } from "next";

import { getEntries } from "@/app/api/entries";
import EmptyPageMessage from "@/components/EmptyPageMessage";
import { List } from "@/components/List";
import { ListCard } from "@/components/ListCard";
import { createMetaTitle } from "@/lib/utils";
import { EntryType } from "@/types";

const TITLE = "notes";
const DESCRIPTION = "A peek into my mind. Random thoughts, notes, and ideas.";

export const metadata: Metadata = {
  title: createMetaTitle(TITLE),
  description: DESCRIPTION,
  openGraph: {
    title: createMetaTitle(TITLE),
    description: DESCRIPTION,
    type: "website",
    url: "https://btn0s.dev/notes",
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
  const entries = await getEntries(EntryType.NOTES);

  return (
    <div className="not-prose flex flex-col gap-12">
      <h1 className="text-balance text-xl text-white">
        <span className="font-light opacity-50">random thoughts, notes, </span>
        <div className="font-bold">and ideas</div>
      </h1>
      {entries.length === 0 ? (
        <EmptyPageMessage />
      ) : (
        <List>
          {entries.map(({ slug, meta, type }) => (
            <ListCard key={slug} meta={meta} slug={slug} type={type} />
          ))}
        </List>
      )}
    </div>
  );
};

export default Page;
