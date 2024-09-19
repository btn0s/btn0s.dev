import { getEntries } from "@/app/api/entries";
import EmptyPageMessage from "@/components/EmptyPageMessage";
import Gallery from "@/components/Gallery";
import { TYPE_META_DESCRIPTIONS } from "@/content/meta";
import { EntryType } from "@/types";

export async function generateMetadata({
  params: { type },
}: {
  params: { type: EntryType; slug: string };
}) {
  return {
    title: `${type} ✦ bt norris`,
    description: TYPE_META_DESCRIPTIONS[type],
    openGraph: {
      title: `${type} ✦ bt norris`,
      description: TYPE_META_DESCRIPTIONS[type],
      images: [
        {
          url: "https://btn0s.dev/images/og-image.png",
        },
      ],
    },
  };
}

const WorkTitle = () => {
  return (
    <h1 className="text-xl text-white">
      <span className="font-light opacity-50">places I&apos;ve been</span>
      <div className="font-bold">on my journey so far</div>
    </h1>
  );
};

const LabTitle = () => {
  return (
    <h1 className="text-xl text-white">
      <span className="font-light opacity-50">a selection of experiments </span>
      <div className="font-bold">from the lab</div>
    </h1>
  );
};

const NotesTitle = () => {
  return (
    <h1 className="text-xl text-white">
      <span className="font-light opacity-50">a slice of my mind</span>
      <div className="font-bold">in random thoughts, notes, and ideas</div>
    </h1>
  );
};

export default async function Page({
  params: { type },
}: {
  params: { type: EntryType };
}) {
  const entries = await getEntries(type);

  const sortedEntries = entries.sort((a, b) => {
    if (!a.metadata.createdAt || !b.metadata.createdAt) return -1;
    if (a.metadata.createdAt < b.metadata.createdAt) return 1;
    if (a.metadata.createdAt > b.metadata.createdAt) return -1;
    return 0;
  });

  return (
    <div className="not-prose flex flex-col gap-12">
      {type === EntryType.WORK ? <WorkTitle /> : null}
      {type === EntryType.LAB ? <LabTitle /> : null}
      {type === EntryType.NOTES ? <NotesTitle /> : null}
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
}
