"use client";

import { FC } from "react";

import { PortableText } from "@portabletext/react";
import Image from "next/image";
import {
  PortableTextMarkComponentProps,
  PortableTextReactComponents,
} from "next-sanity";

import { urlForImage } from "@/sanity/lib/image";

const components: Partial<PortableTextReactComponents> = {
  types: {
    image: ({ value }: { value: any }) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <div className="relative my-8 h-96 w-full">
          <Image
            className="object-cover"
            src={urlForImage(value).url()}
            alt={value.alt || " "}
            fill
          />
        </div>
      );
    },
  },
  marks: {
    link: ({ value, children }: PortableTextMarkComponentProps) => {
      const target = (value?.href || "").startsWith("http")
        ? "_blank"
        : undefined;
      return (
        <a
          href={value?.href}
          target={target}
          rel={target === "_blank" ? "noopener noreferrer" : undefined}
        >
          {children}
        </a>
      );
    },
  },
};

const Post: FC<{ data: any }> = ({ data }) => {
  console.log({ content: data.content });
  return (
    <article className="prose prose-invert w-full max-w-none">
      {data.content && (
        <PortableText value={data.content} components={components} />
      )}
    </article>
  );
};

export default Post;
