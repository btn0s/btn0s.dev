import { Metadata } from "next";

import { getEntries } from "@/app/api/entries";
import EmptyPageMessage from "@/components/EmptyPageMessage";
import { List } from "@/components/List";
import { ListCard } from "@/components/ListCard";
import { createMetaTitle } from "@/lib/utils";
import { EntryType } from "@/types";

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
        url: "https://btn0s.dev/og-share-new.png",
        width: 1200,
        height: 630,
        alt: "btn0s.dev",
      },
    ],
  },
};

const Page = async () => {
  const entries = await getEntries(EntryType.LAB);

  return (
    <div className="not-prose flex flex-col gap-12">
      <h1 className="text-xl text-white">
        <span className="font-light opacity-50">
          a selection of experiments{" "}
        </span>
        <div className="font-bold">from the lab</div>
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
