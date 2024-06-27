import { getSlugsByDir } from "@/app/api/shared";
import { BaseEntry, EntryType } from "@/types";
import { FOLDER_EXCLUDES } from "@/types/api";

const isLocal = process.env.NODE_ENV === "development";

type GetEntries = (type: EntryType) => Promise<BaseEntry[]>;

export const getEntries: GetEntries = async (type) => {
  const typePath = type === EntryType.LAB ? "experiments" : type.toLowerCase();

  const entrySlugs = await getSlugsByDir(
    `./src/content/${typePath}`,
    FOLDER_EXCLUDES,
  );

  const entries: BaseEntry[] = await Promise.all(
    entrySlugs.map(async (filePath) => {
      const content = await import(`@/content/${typePath}/${filePath}.mdx`);
      return {
        type,
        meta: content.meta,
        slug: filePath,
      };
    }),
  );

  return entries.filter((post) => (isLocal ? true : post.meta.published));
};
