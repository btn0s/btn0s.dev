import { getFeaturedEntries } from "@/app/api/entries";
import Home from "@/components/pages/home";
import { EntryType } from "@/types";

export default async function Page() {
  const featuredEntries = await Promise.all([
    getFeaturedEntries(EntryType.WORK),
    getFeaturedEntries(EntryType.LAB),
    getFeaturedEntries(EntryType.NOTES),
  ]);

  return <Home featuredEntries={featuredEntries.flat()} />;
}
