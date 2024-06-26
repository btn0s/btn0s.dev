"use client";

import { FC, PropsWithChildren, useEffect, useState } from "react";

import { LightningBoltIcon } from "@radix-ui/react-icons";
import { stagger, useAnimate } from "framer-motion";
import {
  ArrowRightIcon,
  FlaskConicalIcon,
  NotebookPenIcon,
} from "lucide-react";
import Link from "next/link";
import { PiCactusFill } from "react-icons/pi";

import { Experiment } from "@/app/api/experiments";
import { Note } from "@/app/api/notes";
import { ListCard } from "@/components/ListCard";
import { List } from "@/components/pages/List";
import { CURRENT_LINKS } from "@/content/current-links";
import { useHasUserVisited } from "@/hooks/useAnimateIn";

const HomeSection: FC<PropsWithChildren> = ({ children }) => {
  return (
    <section style={{ opacity: 0, filter: "blur(4px)" }}>{children}</section>
  );
};

interface HomeProps {
  experiments: Experiment[];
  notes: Note[];
}

const Home: FC<HomeProps> = ({ experiments, notes }) => {
  const [contentLoaded, setContentLoaded] = useState(false);
  const [scope, animate] = useAnimate();
  const hasUserVisited = useHasUserVisited();

  useEffect(() => {
    if (hasUserVisited) {
      setContentLoaded(true);
    }

    animate(
      "section",
      {
        opacity: 1,
        filter: "blur(0px)",
      },
      {
        delay: hasUserVisited ? 0 : stagger(0.5),
        duration: 0.5,
      },
    ).then(() => {
      sessionStorage.setItem("hasUserVisited", "true");
      setContentLoaded(true);
    });
  }, [hasUserVisited]);

  if (contentLoaded) {
    window.dispatchEvent(new Event("home-content-loaded"));
  }

  return (
    <div ref={scope} className="flex flex-col gap-12 pb-12">
      <HomeSection>
        <h1 className="text-xl">
          <span className="font-light text-muted-foreground">
            designer, programmer,{" "}
          </span>
          <span className="font-bold">human.</span>
        </h1>
      </HomeSection>

      <HomeSection>
        <h1 className="mb-4 text-sm">
          Powering world class products and teams through tooling, prototyping,
          systems design, and culture.
        </h1>
        <div className="text-sm text-muted-foreground">
          based in Phoenix, Arizona <PiCactusFill className="inline" />
        </div>
      </HomeSection>

      <HomeSection>
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
                <a className="underline" href={url}>
                  {url.split("//")[1].split("/")[0]}
                </a>
              </div>
            ))}
          </div>
        </div>
      </HomeSection>

      {notes.length > 0 && (
        <HomeSection>
          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1 font-mono text-xs">
                <NotebookPenIcon className="size-2" />
                thoughts
              </span>
              {notes.length > 3 && (
                <Link
                  className="text-xs text-muted-foreground hover:underline"
                  href="/notes"
                >
                  view all
                  <ArrowRightIcon className="ml-1 inline size-3" />
                </Link>
              )}
            </div>
            <List>
              {notes.map(({ slug, meta }) => (
                <ListCard key={slug} section="notes" slug={slug} meta={meta} />
              ))}
            </List>
          </div>
        </HomeSection>
      )}

      {experiments.length > 0 && (
        <HomeSection>
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
                  <ArrowRightIcon className="ml-1 inline size-3" />
                </Link>
              )}
            </div>
            <List>
              {experiments.map(({ slug, meta }) => (
                <ListCard
                  key={slug}
                  section="experiments"
                  slug={slug}
                  meta={meta}
                />
              ))}
            </List>
          </div>
        </HomeSection>
      )}
    </div>
  );
};

export default Home;
