"use client";

import React, {
  CSSProperties,
  FC,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";

import { stagger, useAnimate } from "framer-motion";

import amexCoverImg from "@/assets/images/work/amex.png";
import backboneCoverImg from "@/assets/images/work/backbone-share-card.png";
import GalleryCard from "@/components/gallery-card";
import { useHasUserVisited } from "@/hooks/use-animate-in";
import { cn } from "@/lib/utils";
import { BaseEntry, EntryType } from "@/types";

interface CurrentProjectItem {
  title: string;
  company: string;
  role: string;
  href: string;
  isMain?: boolean;
}

const CURRENT_PROJECTS: CurrentProjectItem[] = [
  {
    title: "building a world-class gaming experience",
    company: "backbone",
    role: "staff design engineer",
    href: "/work/backbone",
    isMain: true,
  },
  {
    title: "crafting an IDE for design technologists",
    company: "strella",
    role: "founder",
    href: "https://strella.dev",
  },
  // {
  //   title: "helping angel investors find the next hit games",
  //   company: "indiefundr",
  //   role: "co-founder",
  //   href: "https://indiefundr.gg",
  // },
];

const CurrentProject: FC<CurrentProjectItem> = ({
  title,
  company,
  role,
  href,
  isMain,
}) => {
  return (
    <div className="group flex items-start justify-between gap-2 text-xs text-muted-foreground">
      <div
        className={cn("max-w-[175px]", {
          "text-white": isMain,
        })}
      >
        {title}
      </div>
      <div className="flex flex-col items-end">
        <div className="flex hover:text-white">
          <a
            href={href}
            target={href.startsWith("http") ? "_blank" : "_self"}
            rel="noopener noreferrer"
            className={cn({
              "text-white": isMain,
            })}
          >
            @{company}
          </a>
        </div>
        <span className={!isMain ? "opacity-50" : undefined}>{role}</span>
      </div>
    </div>
  );
};

const HomeSection: FC<
  PropsWithChildren<{
    style?: CSSProperties;
  }>
> = ({ children, style }) => {
  return (
    <section style={{ opacity: 0, filter: "blur(4px)", ...style }}>
      {children}
    </section>
  );
};

const Home: FC = () => {
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
        transform: "translate(0)",
      },
      {
        delay: hasUserVisited ? 0 : stagger(0.75, { startDelay: 0.25 }),
        duration: hasUserVisited ? 0.5 : 0.75,
        ease: "easeOut",
      },
    ).then(() => {
      sessionStorage.setItem("hasUserVisited", "true");
      setContentLoaded(true);
    });
  }, [animate, hasUserVisited]);

  if (contentLoaded) {
    window.dispatchEvent(new Event("home-content-loaded"));
  }

  return (
    <div ref={scope} className="flex flex-col gap-12 pb-12">
      <div className="flex max-w-md flex-col gap-4">
        <HomeSection>
          <h1 className="mb-4 text-xl font-light text-muted-foreground">
            designer, programmer,{" "}
            <span className="font-bold text-white">human.</span>
          </h1>
          <p className="text-sm">
            I just want to create things that make people happy.
          </p>
        </HomeSection>
      </div>

      <div className="flex flex-col gap-12">
        <HomeSection>
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1 text-xs">
                I&apos;m currently...{" "}
              </span>
            </div>
            <div className="flex flex-col gap-4">
              {CURRENT_PROJECTS.map((project) => (
                <CurrentProject key={project.company} {...project} />
              ))}
            </div>
          </div>
        </HomeSection>
      </div>

      <HomeSection style={{ transform: "translateY(12px)" }}>
        <div className="flex flex-col gap-4">
          <GalleryCard
            title="backbone"
            description="take any game, anywhere"
            image={backboneCoverImg}
            type={EntryType.WORK}
            href="/work/backbone"
          />
          <GalleryCard
            title="american express"
            description="a global financial services company"
            image={amexCoverImg}
            type={EntryType.WORK}
            href="/work/american-express"
          />
        </div>
      </HomeSection>
    </div>
  );
};

export default Home;
