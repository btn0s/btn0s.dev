import { getEntry } from "@/app/api/entries";
import FadeBlurLoader from "@/components/FadeBlurLoader";
import Editor from "@/components/editor";
import { TYPE_META_DESCRIPTIONS } from "@/content/meta";
import { createMetaTitle } from "@/lib/utils";
import { EntryType } from "@/types";

export async function generateMetadata({
  params: { type, slug },
}: {
  params: { type: EntryType; slug: string };
}) {
  const entry = await getEntry({ type, slug });

  if (entry) {
    const { metadata } = entry;
    return {
      title: createMetaTitle(metadata.title),
      description: metadata.description,
      openGraph: {
        title: createMetaTitle(metadata.title),
        description: metadata.description,
        images: [
          {
            url: metadata.image,
          },
        ],
      },
    };
  }

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

export default async function Page({
  params: { type, slug },
}: {
  params: { type: EntryType; slug: string };
}) {
  const entry = await getEntry({ type, slug });

  if (!entry) {
    return <div>Entry not found</div>;
  }

  return (
    <FadeBlurLoader className="flex flex-col gap-4">
      <Editor {...entry} />
      {/*<RelatedEntries slug={slug} meta={entryMeta} />*/}
    </FadeBlurLoader>
  );
}
