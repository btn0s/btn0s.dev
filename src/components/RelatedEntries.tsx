import { getEntriesWithTags } from "@/app/api/entries";
import EntriesGallery from "@/components/Gallery";
import { Entry } from "@/types";

const RelatedEntries = async ({
  slug,
  meta,
}: {
  slug: Entry["slug"];
  meta: Entry["metadata"];
}) => {
  const relatedEntries = await getEntriesWithTags(meta.tags).then((res) =>
    res.filter((entry) => entry.slug !== slug),
  );

  if (!relatedEntries.length) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4 py-6">
      <hr />
      <h2 className="text-lg font-bold text-white">Related projects</h2>
      <EntriesGallery entries={relatedEntries} />
    </div>
  );
};

export default RelatedEntries;
