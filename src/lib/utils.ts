import path from "path";

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { BaseEntry, EntryType } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createMetaTitle(title: string) {
  return `${title} | ✦ btn0s`;
}

export function getEntryTypePath(type: EntryType) {
  return type === EntryType.LAB ? "experiments" : type.toLowerCase();
}

export function generateEntryMetadata(type: EntryType) {
  return async ({ params: { slug } }: { params: { slug: string } }) => {
    const MDXContent = await import(
      `../content/${getEntryTypePath(type)}/${slug}.mdx`
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
              url: `/api/og?title=${encodeURIComponent(
                meta.title,
              )}&description=${encodeURIComponent(meta.description)}&category=work`,
            },
          ],
        },
      };
    }

    return {
      title: "an experiment by ✦ btn0s",
      description: "just one of many.",
      openGraph: {
        title: "an experiment by ✦ btn0s",
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
