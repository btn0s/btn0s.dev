import path from "path";

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { EntryType } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createMetaTitle(title: string) {
  return `${title} | ✦ bt norris`;
}

export function getEntryTypePath(type: EntryType) {
  return type === EntryType.LAB ? "experiments" : type.toLowerCase();
}

export function createEntryPath(
  type: EntryType,
  slug: string,
  includeLeadingSlash = true,
) {
  return path.join(
    includeLeadingSlash ? "/" : "",
    getEntryTypePath(type),
    slug,
  );
}

export function generateEntryMetadata(type: EntryType) {
  return async ({ params: { slug } }: { params: { slug: string } }) => {
    const MDXContent = await import(
      `../content/${createEntryPath(type, slug, false)}.mdx`
    );
    const { meta } = MDXContent;

    if (meta) {
      return {
        title: createMetaTitle(meta.title),
        description: meta.description,
        openGraph: {
          title: createMetaTitle(meta.title),
          description: meta.description,
          images: [
            {
              url: meta.metaImage,
            },
          ],
        },
      };
    }

    return {
      title: "an experiment by ✦ bt norris",
      description: "just one of many.",
      openGraph: {
        title: "an experiment by ✦ bt norris",
        description: "just one of many.",
        images: [
          {
            url: "https://btn0s.dev/images/og-image.png",
          },
        ],
      },
    };
  };
}
