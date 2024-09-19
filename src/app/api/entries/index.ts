"use server";

import fs from "fs/promises";
import path from "path";

import { CONTENT_DIR } from "@/lib/utils";
import { Entry, EntryMetadata, EntryType } from "@/types";

const isLocal = process.env.NODE_ENV === "development";

export const getEntries = async (type?: EntryType): Promise<Entry[]> => {
  try {
    const allEntries: Entry[] = [];

    for (const entryType of Object.values(EntryType)) {
      if (type && entryType !== type) continue;

      const typePath = entryType.toLowerCase();
      const entriesDir = path.join(CONTENT_DIR, typePath);
      const slugs = await fs.readdir(entriesDir);

      for (const slug of slugs) {
        const entry = await getEntry({ type: entryType, slug });

        if (entry && (isLocal || entry.metadata.published)) {
          allEntries.push(entry);
        }
      }
    }

    return allEntries;
  } catch (error) {
    console.error(`Error reading entries:`, error);
    return [];
  }
};

interface EntryTypeAndSlug {
  type: EntryType;
  slug: string;
}

export const getEntry = async ({
  type,
  slug,
}: EntryTypeAndSlug): Promise<Entry | null> => {
  if (!slug || !type) {
    console.error(`Invalid entry: ${type}/${slug}`);
    return null;
  }

  try {
    const metadataPath = path.join(
      CONTENT_DIR,
      type.toLowerCase(),
      slug,
      "metadata.json",
    );
    const contentPath = path.join(
      CONTENT_DIR,
      type.toLowerCase(),
      slug,
      "content.json",
    );

    const [metadataRaw, contentRaw] = await Promise.all([
      fs.readFile(metadataPath, "utf-8"),
      fs.readFile(contentPath, "utf-8"),
    ]);

    const metadata: EntryMetadata = JSON.parse(metadataRaw);
    const content = JSON.parse(contentRaw);

    return { type, metadata: metadata, slug, content };
  } catch (error) {
    console.error(`Error reading entry for ${type}/${slug}:`, error);
    return null;
  }
};

// Helper functions for getting featured entries and entries with tags
export const getFeaturedEntries = async (
  type?: EntryType,
): Promise<Entry[]> => {
  const entries = await getEntries(type);
  return entries.filter((entry) => entry.metadata.featured);
};

export const getEntriesWithTags = async (
  tags: string[],
  type?: EntryType,
): Promise<Entry[]> => {
  const entries = await getEntries(type);
  return entries.filter((entry) =>
    entry.metadata.tags?.some((tag) => tags.includes(tag)),
  );
};
