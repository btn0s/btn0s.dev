import { FC } from "react";

import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { BaseEntry } from "@/types";

export const ListCard: FC<BaseEntry> = ({ slug, type, meta }) => {
  return (
    <Link
      key={slug}
      href={`/${type.toLowerCase()}/${slug}`}
      className="relative flex flex-col rounded-md border border-border bg-neutral-900 p-3 text-sm backdrop-blur-2xl transition duration-300 md:hover:bg-white/10"
    >
      <h3 className="mb-1 text-white">{meta.title}</h3>
      <p
        className={cn("max-w-[95%] text-pretty text-muted-foreground", {
          "mb-4": meta.tags && meta.tags.length > 0,
        })}
      >
        {meta.description}
      </p>
      {meta.tags && meta.tags.length > 0 && (
        <div className="flex gap-1">
          {meta.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </Link>
  );
};
