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

export const ExternalLinkWithPreview: FC<
  PropsWithChildren<{
    href: string;
    align?: "start" | "end" | "center";
  }>
> = ({ children, href, align = "end" }) => {
  const urlMetadata = CURRENT_LINKS.find((link) => link.url === href);

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
      <HoverCardContent align={align}>
        <motion.img
          src={urlMetadata.image.src}
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
            className="relative text-sm text-muted-foreground"
          >
            {urlMetadata.description}
          </motion.span>
        </motion.div>
      </HoverCardContent>
    </HoverCard>
  );
};
