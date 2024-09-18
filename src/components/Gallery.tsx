"use client";

import React, { FC } from "react";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Entry } from "@/types";

const EntriesGalleryItemCard: FC<Entry & { showType?: boolean }> = ({
  type,
  slug,
  metadata: { title, image },
  showType = false,
}) => {
  return (
    <Link
      href={`/${type.toLowerCase()}/${slug}`}
      className="group relative col-span-1 row-span-1 overflow-hidden border-white/5 md:aspect-video md:rounded-lg md:border"
    >
      <div className="mb-2 aspect-video w-full md:absolute md:m-0 md:h-full">
        <Image
          src={image}
          alt={title}
          className="inset-0 m-0 h-full w-full transform-gpu rounded-lg border border-white/5 object-cover transition-transform md:absolute md:border-none md:group-hover:scale-[101%]"
          width={800}
          height={450}
          quality={100}
        />
      </div>
      <div className="relative flex flex-col items-start justify-end rounded-lg text-xs md:absolute md:-inset-6 md:p-10">
        <div className="absolute inset-0 bg-black/50 opacity-0 transition duration-300 md:group-hover:opacity-100"></div>
        <div className="transition duration-300 md:opacity-0 md:blur-sm md:group-hover:opacity-100 md:group-hover:blur-none">
          {showType && (
            <span className="text-muted-foreground">
              {type.toLowerCase()} /{" "}
            </span>
          )}
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
  entries: Entry[];
  singleColumn?: boolean;
}) => {
  const pathname = usePathname();

  return (
    <div
      className={cn("grid gap-4", {
        "grid-cols-1": singleColumn,
        "grid-cols-1 md:grid-cols-2": !singleColumn,
      })}
    >
      {entries.map((item) => (
        <EntriesGalleryItemCard
          key={item.metadata.title}
          {...item}
          showType={pathname === "/"}
        />
      ))}
    </div>
  );
};

export default EntriesGallery;
