"use client";

import { FC, PropsWithChildren, useEffect, useState } from "react";

import { stagger, useAnimate } from "framer-motion";
import {
  ArrowRightIcon,
  FlaskConicalIcon,
  NotebookPenIcon,
} from "lucide-react";
import Link from "next/link";
import { PiCactusFill, PiSunFill } from "react-icons/pi";

import { Experiment } from "@/app/api/experiments";
import { Note } from "@/app/api/notes";
import { List } from "@/components/List";
import { ListCard } from "@/components/ListCard";
import { useHasUserVisited } from "@/hooks/useAnimateIn";
import { Subpage } from "@/types/global";

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
        delay: hasUserVisited ? 0 : stagger(0.75, { startDelay: 0.5 }),
        duration: hasUserVisited ? 0.5 : 0.75,
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
      <div className="flex max-w-sm flex-col gap-12">
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
            I use design and technology to make designers more efficient and
            create things that spark joy.
          </h1>
          <div className="text-xs text-muted-foreground">
            based in Phoenix <PiCactusFill className="mr-[2px] inline" />
            <PiSunFill className="inline" />
          </div>
        </HomeSection>

        <HomeSection>
          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1 font-mono text-xs">
                i'm currently
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <div className="group mb-2 flex items-start justify-between gap-2 text-sm text-muted-foreground">
                <div className="max-w-[200px] text-white">
                  building tools and prototypes for designers
                </div>
                <div className="flex flex-col items-end">
                  <div className="flex hover:text-white">
                    <a
                      className="group-hover:underline"
                      href="https://playbackbone.com"
                    >
                      backbone
                    </a>
                  </div>
                  <span className="opacity-50">design engineer</span>
                </div>
              </div>

              <div className="group flex items-start justify-between gap-2 text-xs text-muted-foreground">
                <div className="max-w-[175px]">
                  crafting the worlds first product IDE
                </div>
                <div className="flex flex-col items-end">
                  <div className="flex hover:text-white">
                    <a
                      className="group-hover:underline"
                      href="https://strella.dev"
                    >
                      strella
                    </a>
                  </div>
                  <span className="opacity-50">founder</span>
                </div>
              </div>
              <div className="group flex items-start justify-between gap-2 text-xs text-muted-foreground">
                <div className="max-w-[175px]">
                  helping angel investors find the next hit games
                </div>
                <div className="flex flex-col items-end">
                  <div className="flex hover:text-white">
                    <a
                      className="group-hover:underline"
                      href="https://indiefundr.gg"
                    >
                      indiefundr
                    </a>
                  </div>
                  <span className="opacity-50">co-founder</span>
                </div>
              </div>
            </div>
          </div>
        </HomeSection>
      </div>

      <div className="flex max-w-sm flex-col gap-12">
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
                  <ListCard
                    key={slug}
                    section={Subpage.NOTES}
                    slug={slug}
                    meta={meta}
                  />
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
                    href="/lab"
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
                    section={Subpage.LAB}
                    slug={slug}
                    meta={meta}
                  />
                ))}
              </List>
            </div>
          </HomeSection>
        )}
      </div>
    </div>
  );
};

export default Home;
