import { tag } from "postcss-selector-parser";

import { getSlugsByDir } from "@/app/api/shared";
import { getEntryTypePath } from "@/lib/utils";
import { BaseEntry, BaseEntryMetadata, EntryType } from "@/types";
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

export const getFeaturedEntries: GetEntries = async (type) => {
  const entries = await getEntries(type);
  return entries.filter((entry) => entry.meta.featured);
};

export const getEntriesByCompany = async (type: EntryType, company: string) => {
  const entries = await getEntries(type);
  return entries.filter((entry) => entry.meta.company === company);
};

export const getEntriesWithTags = async (tags: string[]) => {
  const entries = await Promise.all(
    Object.values(EntryType).map(getEntries),
  ).then((res) => res.flat());

  return entries.filter((entry) => {
    if (entry.meta.tags === undefined || tags === undefined) return;
    return entry.meta.tags.some((tag) => tags.includes(tag));
  });
};

export const getEntryMetadata = async (type: EntryType, slug: string) => {
  const content = await import(
    `@/content/${getEntryTypePath(type)}/${slug}.mdx`
  );
  return content.meta as BaseEntryMetadata;
};
