import { getFeaturedEntries } from "@/app/api/entries";
import Home from "@/components/pages/home";
import { EntryType } from "@/types";

export default async function Page() {
  const entries = await Promise.all([
    getFeaturedEntries(EntryType.WORK),
    getFeaturedEntries(EntryType.LAB),
    getFeaturedEntries(EntryType.NOTES),
  ]);

  const sortedEntries = entries.flat().sort((a, b) => {
    if (!a.metadata.startDate || !b.metadata.startDate) return 1;
    if (a.metadata.startDate < b.metadata.startDate) return 1;
    if (a.metadata.startDate > b.metadata.startDate) return -1;
    return 0;
  });

  return <Home featuredEntries={sortedEntries} />;
}
