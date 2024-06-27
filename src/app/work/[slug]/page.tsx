import FadeBlurLoader from "@/components/FadeBlurLoader";
import { generateEntryMetadata, getEntryTypePath } from "@/lib/utils";
import { EntryType } from "@/types";

const ENTRY_TYPE = EntryType.WORK;

export const generateMetadata = generateEntryMetadata(ENTRY_TYPE);

export default async function Page({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const MDXContent = await import(
    `../../../content/${getEntryTypePath(ENTRY_TYPE)}/${slug}.mdx`
  );
  return (
    <FadeBlurLoader>
      <MDXContent.default />
    </FadeBlurLoader>
  );
}
