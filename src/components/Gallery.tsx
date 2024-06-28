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
      className="group relative col-span-1 row-span-1 aspect-video overflow-hidden rounded-lg border border-white/5"
    >
      <Image
        src={image}
        alt={title}
        className="md:absolute aspect-video inset-0 m-0 size-full transform-gpu rounded-lg object-cover transition-transform md:group-hover:scale-[105%]"
        width={160 * 4}
        height={90 * 4}
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
      />
      <div className="relative md:absolute -inset-6 flex flex-col items-start justify-end rounded-lg p-10 text-xs">
        <div className="absolute inset-0 bg-black/10 opacity-0 transition duration-300 md:group-hover:opacity-100"></div>
        <div className="md:opacity-0 transition duration-300 md:blur-sm md:group-hover:opacity-100 md:group-hover:blur-none">
          {title}
        </div>
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
