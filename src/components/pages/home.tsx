"use client";

import React, { FC, PropsWithChildren, useEffect, useState } from "react";

import { stagger, useAnimate } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

import imagePlaceholder from "@/assets/images/image-placeholder.png";
import FadeBlurLoader from "@/components/FadeBlurLoader";
import { useHasUserVisited } from "@/hooks/use-animate-in";
import { cn } from "@/lib/utils";
import { BaseEntryMetadata, EntryType } from "@/types";

interface HomeGalleryItem {
  type: EntryType;
  href: string;
  image: StaticImageData;
  title: string;
  description: string;
}

type HomeGalleryCollection = HomeGalleryItem[];

const HOME_COLLECTION: HomeGalleryCollection = [...Array(6)].map(() => ({
  type: EntryType.WORK,
  href: "/backbone",
  image: imagePlaceholder,
  title: "Project Title",
  description: "Project Description",
}));

const HomeGalleryItemCard: FC<HomeGalleryItem> = ({
  type,
  image,
  title,
  href,
}) => {
  return (
    <Link href={`${type.toLowerCase()}${href}`} className="relative">
      <Image
        src={image}
        alt={title}
        className="rounded-lg border border-white/5"
      />
      <div className="absolute inset-x-0 bottom-0 p-6 text-sm">{title}</div>
    </Link>
  );
};

const HomeGallery = ({ collection }: { collection: HomeGalleryCollection }) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {collection.map((item) => (
        <HomeGalleryItemCard key={item.title} {...item} />
      ))}
    </div>
  );
};

interface CurrentProjectItem {
  title: string;
  company: string;
  role: string;
  href: string;
  isMain?: boolean;
}

const CURRENT_PROJECTS: CurrentProjectItem[] = [
  {
    title: "building tools and prototypes for designers",
    company: "backbone",
    role: "design engineer",
    href: "https://playbackbone.com",
    isMain: true,
  },
  {
    title: "crafting the worlds first product IDE",
    company: "strella",
    role: "founder",
    href: "https://strella.dev",
  },
  {
    title: "helping angel investors find the next hit games",
    company: "indiefundr",
    role: "co-founder",
    href: "https://indiefundr.gg",
  },
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
          <a className="group-hover:underline" href={href} target="_blank">
            @{company}
          </a>
        </div>
        <span className="opacity-50">{role}</span>
      </div>
    </div>
  );
};

const HomeSection: FC<PropsWithChildren> = ({ children }) => {
  return (
    <section style={{ opacity: 0, filter: "blur(4px)" }}>{children}</section>
  );
};

interface HomeProps {}

const Home: FC<HomeProps> = () => {
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
        delay: hasUserVisited ? 0 : stagger(0.75, { startDelay: 0.25 }),
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
      <div className="flex max-w-sm flex-col gap-4">
        <HomeSection>
          <h1 className="mb-4 text-xl">
            <span className="font-light text-muted-foreground">
              designer, programmer,{" "}
            </span>
            <span className="font-bold">human.</span>
          </h1>
          <h2 className="text-sm">
            I use design and technology to make designers more efficient and
            create things that spark joy.
          </h2>
        </HomeSection>
      </div>

      <div className="flex max-w-md flex-col gap-12">
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

      <FadeBlurLoader>
        <HomeGallery collection={HOME_COLLECTION} />
      </FadeBlurLoader>
    </div>
  );
};

export default Home;
