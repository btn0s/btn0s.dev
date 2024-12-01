"use client";

import React, { FC } from "react";

import Image, { StaticImageData } from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { EntryType } from "@/types";

interface GalleryCardProps {
  invert?: boolean;
  href: string;
  title: string;
  description?: string;
  image: string | StaticImageData;
  className?: string;
  type?: EntryType;
}

const GalleryCard: FC<GalleryCardProps> = ({
  href,
  title,
  description,
  image,
  className,
  type,
  invert = false,
}: GalleryCardProps) => {
  return (
    <Link
      href={href}
      className="group relative col-span-1 row-span-1 overflow-hidden border-white/5 md:aspect-video md:rounded-lg md:border"
    >
      <div className="mb-2 aspect-video w-full md:absolute md:m-0 md:h-full">
        <Image
          src={image}
          alt={title}
          className="inset-0 m-0 h-full w-full transform-gpu rounded-lg border border-white/5 object-contain transition-transform md:absolute md:border-none md:group-hover:scale-[101%]"
          quality={100}
        />
      </div>
      <div className="relative flex flex-col items-start justify-end rounded-lg text-xs md:absolute md:-inset-6 md:p-10">
        <div className="absolute inset-0 bg-black/50 opacity-0 transition duration-300 md:group-hover:opacity-100"></div>
        <div
          className={cn(
            "transition duration-300 md:opacity-0 md:blur-sm md:group-hover:opacity-100 md:group-hover:blur-none",
            {
              "text-muted-foreground": !invert,
              "text-white": invert,
            },
          )}
        >
          {type && <span>{type?.toLowerCase()} / </span>}
          <span className="font-bold text-white">{title}</span>
          <div>{description}</div>
        </div>
      </div>
    </Link>
  );
};

export default GalleryCard;
