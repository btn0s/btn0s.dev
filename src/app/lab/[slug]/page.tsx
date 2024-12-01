import { getEntryMetadata } from "@/app/api/entries";
import { generateEntryMetadata, getEntryTypePath } from "@/lib/utils";
import { EntryType } from "@/types";

import FadeBlurLoader from "@/components/FadeBlurLoader";
import RelatedEntries from "@/components/RelatedEntries";

const ENTRY_TYPE = EntryType.LAB;

export const generateMetadata = generateEntryMetadata(ENTRY_TYPE);

export default async function Page({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const entryMeta = await getEntryMetadata(ENTRY_TYPE, slug);
  const MDXContent = await import(
    `../../../content/${getEntryTypePath(ENTRY_TYPE)}/${slug}.mdx`
  );
  return (
    <FadeBlurLoader className="flex flex-col gap-4">
      <div className="prose prose-sm prose-invert w-full max-w-none">
        <MDXContent.default />
      </div>
      <RelatedEntries slug={slug} meta={entryMeta} />
    </FadeBlurLoader>
  );
}
