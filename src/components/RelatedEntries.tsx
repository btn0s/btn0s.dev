import { getEntriesWithTags } from "@/app/api/entries";
import EntriesGallery from "@/components/Gallery";
import { BaseEntry } from "@/types";

const RelatedEntries = async ({
  slug,
  meta,
}: {
  slug: BaseEntry["slug"];
  meta: BaseEntry["meta"];
}) => {
  const relatedEntries = await getEntriesWithTags(meta.tags).then((res) =>
    res.filter((entry) => entry.slug !== slug),
  );

  if (!relatedEntries.length) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-bold text-white">Related projects</h2>
      <EntriesGallery entries={relatedEntries} />
    </div>
  );
};

export default RelatedEntries;
