import path from "path";

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { getEntry } from "@/app/api/entries";
import { EntryType } from "@/types";

/* ClassName helpers */

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/* SEO helpers */

export function createMetaTitle(title: string) {
  return `${title} | ✦ bt norris`;
}

/* Path helpers */

export const CONTENT_DIR = path.join(process.cwd(), "src/content");

export const getMetadataPath = (type: EntryType, slug: string) =>
  path.join(CONTENT_DIR, type.toLowerCase(), slug, "metadata.json");

export const getContentPath = (type: EntryType, slug: string) =>
  path.join(CONTENT_DIR, type.toLowerCase(), slug, "content.json");
