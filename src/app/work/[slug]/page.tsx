import { POST_QUERY } from "@/app/work/queries";
import FadeBlurLoader from "@/components/FadeBlurLoader";
import Post from "@/components/Post";
import { generateEntryMetadata } from "@/lib/utils";
import { sanityFetch } from "@/sanity/lib/client";
import { EntryType } from "@/types";

const ENTRY_TYPE = EntryType.WORK;

export const generateMetadata = generateEntryMetadata(ENTRY_TYPE);

const Page = async ({ params: { slug } }: { params: { slug: string } }) => {
  const post = await sanityFetch({
    query: POST_QUERY,
    params: {
      slug: `/work/${slug}`,
    },
  });
  console.log({ post });

  return (
    <FadeBlurLoader className="flex w-full flex-col gap-4">
      <Post data={post} />
    </FadeBlurLoader>
  );
};

export default Page;
