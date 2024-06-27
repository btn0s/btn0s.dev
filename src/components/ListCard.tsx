import { FC } from "react";

import Link from "next/link";

import { Note } from "@/app/api/notes";
import { EntryType } from "@/types";

export const ListCard: FC<{
  slug: string;
  section: EntryType;
  meta: Note["meta"];
}> = ({ slug, section, meta }) => {
  return (
    <Link
      key={slug}
      href={`/${section.toLowerCase()}/${slug}`}
      className="relative flex flex-col gap-1 rounded-md border border-border bg-neutral-900 p-3 text-sm backdrop-blur-2xl md:hover:bg-white/10"
    >
      <h3 className="text-white">{meta.title}</h3>
      <p className="max-w-[95%] text-pretty text-xs text-muted-foreground">
        {meta.description}
      </p>
    </Link>
  );
};
