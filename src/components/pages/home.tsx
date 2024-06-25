"use client";

import { FC, PropsWithChildren } from "react";

import { LightningBoltIcon } from "@radix-ui/react-icons";
import { AnimatePresence, motion } from "framer-motion";
import { FlaskConicalIcon, NotebookPenIcon } from "lucide-react";
import Link from "next/link";
import { PiCactusFill } from "react-icons/pi";

import { Experiment } from "@/app/api/experiments";
import { Note } from "@/app/api/notes";
import FadeBlurLoader from "@/components/FadeBlurLoader";
import { ExternalLinkWithPreview } from "@/components/experiments/ExternalLinkWithPreview";
import { CURRENT_LINKS } from "@/content/current-links";

interface HomeProps {
  experiments: Experiment[];
  notes: Note[];
}

const ListCard: FC<{
  slug: string;
  section: "experiments" | "posts";
  meta: Note["meta"];
}> = ({ slug, section, meta }) => {
  return (
    <Link
      key={slug}
      href={`/${section}/${slug}`}
      className="flex flex-col gap-1 rounded-md border border-border bg-white/5 p-3 text-sm transition-colors duration-200 hover:bg-white/10"
    >
      <h3 className="text-white">{meta.title}</h3>
      <p className="max-w-[95%] text-pretty text-xs text-muted-foreground">
        {meta.description}
      </p>
    </Link>
  );
};

const List: FC<PropsWithChildren> = ({ children }) => {
  return <div className="flex flex-col gap-2">{children}</div>;
};

const Home: FC<HomeProps> = ({ experiments, notes }) => {
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
        <FadeBlurLoader disabled>
          <h1 className="text-xl">
            <span className="font-light opacity-50">
              Designer, programmer,{" "}
            </span>
            <span className="font-bold">human.</span>
          </h1>
        </FadeBlurLoader>

        <FadeBlurLoader disabled>
          <h2 className="text-balance text-sm">
            i'm a multidisciplinary designer and developer based in{" "}
            <PiCactusFill className="inline" /> Phoenix, Arizona.
          </h2>
        </FadeBlurLoader>

        <FadeBlurLoader disabled>
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
                  className="flex items-center justify-between gap-2 text-sm text-muted-foreground hover:text-white"
                >
                  <span>{role} @</span>
                  <ExternalLinkWithPreview href={url}>
                    {url.split("//")[1].split("/")[0]}
                  </ExternalLinkWithPreview>
                </div>
              ))}
            </div>
          </div>
        </FadeBlurLoader>

        {notes.length > 0 && (
          <FadeBlurLoader disabled className="isolate">
            <div className="flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1 font-mono text-xs">
                  <NotebookPenIcon className="size-2" />
                  thoughts
                </span>
                {notes.length > 3 && (
                  <Link
                    className="text-xs text-muted-foreground underline"
                    href="/notes"
                  >
                    view all
                  </Link>
                )}
              </div>
              <List>
                {notes.map(({ slug, meta }) => (
                  <ListCard section="posts" slug={slug} meta={meta} />
                ))}
              </List>
            </div>
          </FadeBlurLoader>
        )}

        {experiments.length > 0 && (
          <FadeBlurLoader disabled className="isolate">
            <div className="flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1 font-mono text-xs">
                  <FlaskConicalIcon className="size-2" />
                  experiments
                </span>
                {experiments.length > 3 && (
                  <Link
                    className="text-xs text-muted-foreground underline"
                    href="/experiments"
                  >
                    view all
                  </Link>
                )}
              </div>
              <List>
                {experiments.map(({ slug, meta }) => (
                  <ListCard section="experiments" slug={slug} meta={meta} />
                ))}
              </List>
            </div>
          </FadeBlurLoader>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Home;
