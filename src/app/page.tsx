"use client";

import { FC, PropsWithChildren } from "react";

import { motion } from "framer-motion";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { CURRENT_LINKS } from "@/content/current-links";
import { CURRENT_LINKS_METADATA } from "@/content/current-links-metadata";

const ExternalLinkWithPreview: FC<
  PropsWithChildren<{
    href: string;
  }>
> = ({ children, href }) => {
  const urlMetadata = CURRENT_LINKS_METADATA[href];

  if (!urlMetadata) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="underline"
      >
        {children}
      </a>
    );
  }

  return (
    <HoverCard openDelay={0.2} closeDelay={0.2}>
      <HoverCardTrigger asChild>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          {children}
        </a>
      </HoverCardTrigger>
      <HoverCardContent>
        <motion.img
          src={urlMetadata.image}
          alt={urlMetadata.title}
          initial={{ opacity: 0, top: -12 }}
          animate={{ opacity: 1, top: 0 }}
          transition={{ duration: 0.2 }}
          className="relative mb-4 w-full rounded-md"
        />
        <motion.div className="flex flex-col">
          <motion.span
            initial={{ opacity: 0, top: -12 }}
            animate={{ opacity: 1, top: 0 }}
            transition={{ duration: 0.1, delay: 0.1 }}
            className="relative text-white"
          >
            {urlMetadata.title}
          </motion.span>
          <motion.span
            initial={{ opacity: 0, top: -12 }}
            animate={{ opacity: 1, top: 0 }}
            transition={{ duration: 0.1, delay: 0.15 }}
            className="text-muted-foreground relative text-sm"
          >
            {urlMetadata.description}
          </motion.span>
        </motion.div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default function Home() {
  return (
    <main className="p-6">
      <div className="flex max-w-lg flex-col gap-12">
        <div className="flex gap-2">
          <span>✦ @btn0s</span>
          {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
          <span className="text-muted-foreground">
            // designer, programmer, human
          </span>
        </div>
        <p>
          I&apos;m part designer, part programmer, and fully obsessed with
          making things that are both beautiful and functional.
        </p>
        <div className="flex flex-col gap-5">
          <span>current</span>
          <div className="flex flex-col gap-1">
            {CURRENT_LINKS.map(({ role, url }) => (
              <div
                key={url}
                className="text-muted-foreground flex items-center justify-between gap-24 hover:text-white"
              >
                <span>{role} @</span>
                <ExternalLinkWithPreview href={url}>
                  {url.split("//")[1].split("/")[0]}
                </ExternalLinkWithPreview>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
