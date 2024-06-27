import React, { FC } from "react";

import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { BaseEntry } from "@/types";

const EntriesGalleryItemCard: FC<BaseEntry> = ({
  type,
  slug,
  meta: { title, image, description },
}) => {
  return (
    <Link
      href={`/${type.toLowerCase()}/${slug}`}
      className="group relative col-span-1 row-span-1 aspect-video transform-gpu overflow-hidden rounded-lg border border-white/5 transition hover:scale-[101%]"
    >
      <Image
        src={image}
        alt={title}
        className="absolute inset-0 m-0 size-full rounded-lg object-cover"
        width={160 * 4}
        height={90 * 4}
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
      />
      <div className="absolute -inset-6 flex flex-col items-start justify-end rounded-lg bg-black/20 p-10 text-sm opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
        <div>{title}</div>
      </div>
    </Link>
  );
};

const EntriesGallery = ({
  entries,
  singleColumn = false,
}: {
  entries: BaseEntry[];
  singleColumn?: boolean;
}) => {
  return (
    <div
      className={cn("grid gap-4", {
        "grid-cols-1": singleColumn,
        "grid-cols-1 md:grid-cols-2": !singleColumn,
      })}
    >
      {entries.map((item) => (
        <EntriesGalleryItemCard key={item.meta.title} {...item} />
      ))}
    </div>
  );
};

export default EntriesGallery;
