"use client";

import { FC, useEffect, useState } from "react";

import { LightningBoltIcon } from "@radix-ui/react-icons";
import {
  AnimatePresence,
  motion,
  useAnimate,
  useAnimation,
} from "framer-motion";
import { FlaskConicalIcon, NotebookPenIcon } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";

import { Experiment } from "@/app/api/experiments";
import { Post } from "@/app/api/posts";
import FadeBlurLoader from "@/components/FadeBlurLoader";
import { ExternalLinkWithPreview } from "@/components/experiments/ExternalLinkWithPreview";
import { CURRENT_LINKS } from "@/content/current-links";

interface HomeProps {
  experiments: Experiment[];
  posts: Post[];
}

const Home: FC<HomeProps> = ({ experiments, posts }) => {
  return (
    <motion.div
      className="flex flex-col gap-12"
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      }}
      initial="hidden"
      animate="visible"
      transition={{
        staggerChildren: 0.5,
      }}
    >
      <AnimatePresence>
        <motion.div
          variants={{
            hidden: { display: "none", opacity: 0, filter: "blur(4px)" },
            visible: { display: "block", opacity: 1, filter: "blur(0px)" },
          }}
        >
          <h1 className="text-xl">
            <span className="font-light opacity-50">
              Designer, programmer,{" "}
            </span>
            <span className="font-bold">human.</span>
          </h1>
        </motion.div>

        <motion.div
          variants={{
            hidden: { display: "none", opacity: 0, filter: "blur(4px)" },
            visible: { display: "block", opacity: 1, filter: "blur(0px)" },
          }}
        >
          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1 font-mono text-xs">
                <LightningBoltIcon className="size-2" />
                currently
              </span>
            </div>
            <div className="flex flex-col gap-1">
              {CURRENT_LINKS.map(({ role, url }) => (
                <div
                  key={url}
                  className="flex items-center justify-between gap-2 text-muted-foreground hover:text-white"
                >
                  <span>{role} @</span>
                  <ExternalLinkWithPreview href={url}>
                    {url.split("//")[1].split("/")[0]}
                  </ExternalLinkWithPreview>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
        {posts.length > 0 && (
          <FadeBlurLoader disabled>
            <div className="flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1 font-mono text-xs">
                  <NotebookPenIcon className="size-2" />
                  thoughts
                </span>
                {posts.length > 3 && (
                  <Link
                    className="text-muted-foreground underline"
                    href="/posts"
                  >
                    view all
                  </Link>
                )}
              </div>
              <div className="flex flex-col ">
                {posts.map(({ slug, meta }) => (
                  <Link
                    key={slug}
                    href={`/posts/${slug}`}
                    className="-m-3 flex flex-col rounded-md p-3 transition-colors duration-200 hover:bg-white/5"
                  >
                    <h3 className="text-white">{meta.title}</h3>
                    <p className="max-w-[95%] text-pretty text-muted-foreground">
                      {meta.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </FadeBlurLoader>
        )}
        {experiments.length > 0 && (
          <FadeBlurLoader disabled>
            <div className="flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1 font-mono text-xs">
                  <FlaskConicalIcon className="size-2" />
                  experiments
                </span>
                {experiments.length > 3 && (
                  <Link
                    className="text-muted-foreground underline"
                    href="/experiments"
                  >
                    view all
                  </Link>
                )}
              </div>
              <div className="flex flex-col gap-5 text-muted-foreground">
                {experiments.map(({ slug, meta }) => (
                  <Link
                    key={slug}
                    href={`/experiments/${slug}`}
                    className="-mx-3 -my-2 flex flex-col rounded-md px-3 py-2 transition-colors duration-200 hover:bg-white/5"
                  >
                    <h3 className="text-white">{`${meta.title}`}</h3>
                    <p className="max-w-[95%] text-pretty text-muted-foreground">{`${meta.description}`}</p>
                  </Link>
                ))}
              </div>
            </div>
          </FadeBlurLoader>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Home;
