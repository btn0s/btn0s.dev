"use client";

import React, { FC } from "react";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { urlForImage } from "@/sanity/lib/image";
import { POSTS_QUERYResult } from "@/sanity/types";

const GalleryItemCard: FC<
  POSTS_QUERYResult[number] & { showType?: boolean }
> = ({ title, slug, coverMedia, tags, showType = false }) => {
  const coverImage = coverMedia?.find(
    (image) => image && image._type === "image",
  );

  return (
    <Link
      href={slug?.current || "/not-found"}
      className="group relative col-span-1 row-span-1 overflow-hidden border-white/5 md:aspect-video md:rounded-lg md:border"
    >
      <div className="mb-2 aspect-video w-full md:absolute md:m-0 md:h-full">
        {coverImage && (
          <Image
            src={urlForImage(coverImage).url()}
            alt={title || ""}
            width={1920}
            height={1080}
            quality={100}
            className="inset-0 m-0 h-full w-full transform-gpu rounded-lg border border-white/5 object-cover transition-transform md:absolute md:border-none md:group-hover:scale-[101%]"
          />
        )}
      </div>
      <div className="relative flex flex-col items-start justify-end rounded-lg text-xs md:absolute md:-inset-6 md:p-10">
        <div className="absolute inset-0 bg-black/50 opacity-0 transition duration-300 md:group-hover:opacity-100"></div>
        <div className="transition duration-300 md:opacity-0 md:blur-sm md:group-hover:opacity-100 md:group-hover:blur-none">
          {showType && <span className="text-muted-foreground">work / </span>}
          {title}
        </div>
      </div>
    </Link>
  );
};

const Gallery: FC<{
  posts: POSTS_QUERYResult;
  singleColumn?: boolean;
}> = ({ posts, singleColumn = false }) => {
  const pathname = usePathname();

  return (
    <div
      className={cn("grid gap-4", {
        "grid-cols-1": singleColumn,
        "grid-cols-1 md:grid-cols-2": !singleColumn,
      })}
    >
      {posts.map((post) => (
        <GalleryItemCard key={post._id} showType={pathname === "/"} {...post} />
      ))}
    </div>
  );
};

export default Gallery;
