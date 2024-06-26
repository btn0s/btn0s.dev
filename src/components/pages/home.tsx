"use client";

import { FC, PropsWithChildren, useEffect, useState } from "react";

import { stagger, useAnimate } from "framer-motion";
import { BriefcaseBusinessIcon } from "lucide-react";
import Image from "next/image";

import { Experiment } from "@/app/api/experiments";
import { Note } from "@/app/api/notes";
import imagePlaceholder from "@/assets/images/image-placeholder.png";
import FadeBlurLoader from "@/components/FadeBlurLoader";
import { useHasUserVisited } from "@/hooks/useAnimateIn";
import { cn } from "@/lib/utils";

const DUMMY_COLLECTION = [
  {
    slug: "test",
    image: imagePlaceholder,
    meta: {
      title: "Test",
    },
  },
  {
    slug: "test-2",
    image: imagePlaceholder,
    meta: {
      title: "Test 2",
    },
  },
  {
    slug: "test-3",
    image: imagePlaceholder,
    meta: {
      title: "Test 3",
    },
  },
  {
    slug: "test-4",
    image: imagePlaceholder,
    meta: {
      title: "Test 4",
    },
  },
  {
    slug: "test-5",
    image: imagePlaceholder,
    meta: {
      title: "Test 5",
    },
  },
  {
    slug: "test-6",
    image: imagePlaceholder,
    meta: {
      title: "Test 6",
    },
  },
];

const Masonry = ({ collection }: { collection: any }) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {collection.map((item: any) => (
        <div key={item.slug} className="relative">
          <Image
            src={item.image}
            alt={item.meta.title}
            className="rounded-lg border border-white/5"
          />
          <div className="absolute inset-x-0 bottom-0 p-6 text-sm">
            {item.meta.title}
          </div>
        </div>
      ))}
    </div>
  );
};

interface CurrentProject {
  title: string;
  company: string;
  role: string;
  href: string;
  isMain?: boolean;
}

const CURRENT_PROJECTS: CurrentProject[] = [
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

const CurrentProject: FC<CurrentProject> = ({
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

      <div className="flex flex-col gap-12">
        <HomeSection>
          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1 text-xs">
                <BriefcaseBusinessIcon className="size-2" />
                i&apos;m currently{" "}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              {CURRENT_PROJECTS.map((project) => (
                <CurrentProject key={project.company} {...project} />
              ))}
            </div>
          </div>
        </HomeSection>
      </div>

      <FadeBlurLoader>
        <Masonry collection={DUMMY_COLLECTION} />
      </FadeBlurLoader>
    </div>
  );
};

export default Home;
