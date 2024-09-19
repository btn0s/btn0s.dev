"use server";

import fs from "fs/promises";

import { getContentPath, getMetadataPath } from "@/lib/utils";
import { EntryType } from "@/types";

interface UpdateEntryContent {
  type: EntryType;
  slug: string;
  content: string;
}

export async function updateEntryContent({
  type,
  slug,
  content,
}: UpdateEntryContent) {
  const contentPath = getContentPath(type, slug);

  try {
    await fs.writeFile(contentPath, content);
    console.log(`Content for /${type}/${slug} updated`);
  } catch (error) {
    console.error(`Error writing content for /${type}/${slug}:`, error);
    throw error;
  }
}

interface UpdateEntryMetadata {
  type: EntryType;
  slug: string;
  metadata: string;
}

export async function updateEntryMetadata({
  type,
  slug,
  metadata,
}: UpdateEntryMetadata) {
  const metadataPath = getMetadataPath(type, slug);

  try {
    await fs.writeFile(
      metadataPath,
      JSON.stringify(JSON.parse(metadata), null, 2),
    );
  } catch (error) {
    console.error(`Error writing metadata for ${type}/${slug}:`, error);
    throw error;
  }
}
