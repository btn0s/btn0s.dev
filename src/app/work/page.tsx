import { Fragment } from "react";

import { ArrowRight } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import amexImage from "@/assets/images/work/amex.png";
import backboneImage from "@/assets/images/work/backbone-share-card.webp";
import PageTitle from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn, createMetaTitle } from "@/lib/utils";

const TITLE = "work";
const DESCRIPTION = "My journey so far.";

export const metadata: Metadata = {
  title: createMetaTitle(TITLE),
  description: DESCRIPTION,
  openGraph: {
    title: createMetaTitle(TITLE),
    description: DESCRIPTION,
    type: "website",
    url: "https://btn0s.dev/work",
    images: [
      {
        url: "https://btn0s.dev/og-share.png",
        width: 1200,
        height: 630,
        alt: "btn0s.dev",
      },
    ],
  },
};

interface TimelineRole {
  title: string | null;
  startDate?: string;
  endDate?: string;
  isCurrent?: boolean;
}

interface TimelineItem {
  company: string;
  description?: string;
  href?: string;
  image?: any;
  roles: TimelineRole[];
}

const TIMELINE: TimelineItem[] = [
  {
    company: "Backbone",
    description: "Take any game, anywhere.",
    href: "/work/backbone",
    image: backboneImage,
    roles: [
      {
        title: "Staff Design Engineer",
        startDate: "2023",
        isCurrent: true,
      },
      {
        title: "Senior Frontend Engineer",
        startDate: "2021",
        endDate: "2023",
      },
    ],
  },
  {
    company: "American Express",
    description: "A global payments company.",
    href: "/work/american-express",
    image: amexImage,
    roles: [
      {
        title: "Software Engineer II",
        startDate: "2020",
        endDate: "2021",
      },
    ],
  },
  {
    company: "Sobol",
    description: "The hub for all your DAOs.",
    roles: [
      {
        title: "Product Designer",
        startDate: "2019",
        endDate: "2020",
      },
    ],
  },
  {
    company: "Hownd",
    description: "A pay-per-visit platform for brick-and-mortar.",
    roles: [
      {
        title: "Frontend Engineer",
        startDate: "2018",
        endDate: "2019",
      },
    ],
  },
  {
    company: "Yandy",
    description: "The world's largest online lingerie retailer.",
    roles: [
      {
        title: "UI/UX Designer",
        startDate: "2017",
        endDate: "2018",
      },
    ],
  },
  {
    company: "Freelance",
    description: "Photoshop, JQuery, and a lot of coffee.",
    roles: [
      {
        title: "Freelance Designer",
        startDate: "2014",
        endDate: "2017",
      },
    ],
  },
  {
    company: "Custom myspace pages for my friends",
    description: "The good ol' days.",
    roles: [
      {
        title: "xgotham.norrisx",
        startDate: "2005",
        endDate: "2009",
      },
    ],
  },
  {
    company: "My uncle's freelance gig",
    description: "Learned something called ColdFusion?",
    roles: [
      {
        title: "Intern (Unpaid)",
        startDate: "2005",
        endDate: "2008",
      },
    ],
  },
  {
    company: "DOS games with my grandpa",
    description: "My first exposure to code.",
    roles: [
      {
        title: "Happy kid",
        startDate: "2003",
      },
    ],
  },
];

const TimelineItem = ({ item }: { item: TimelineItem }) => {
  return (
    <div
      className={cn(
        "relative flex flex-col justify-between gap-4 rounded-md p-4 text-xs transition duration-300",
        {
          "group hover:scale-[98%]": item.href,
        },
      )}
    >
      {item.href ? (
        <Link href={item.href} className="absolute inset-0 z-10" />
      ) : null}
      {item.image ? (
        <div className="relative isolate aspect-video overflow-hidden rounded-md border border-white/10">
          <div className="absolute inset-0 z-10 flex scale-[90%] items-center justify-center opacity-0 blur-sm transition duration-300 group-hover:scale-[100%] group-hover:opacity-100 group-hover:blur-none">
            <Button>
              View <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          <Image
            src={item.image}
            alt={item.company}
            className="h-full w-full object-cover transition duration-300 group-hover:blur-sm"
          />
        </div>
      ) : (
        <Separator />
      )}
      <div className="flex flex-1 justify-between gap-12 px-1">
        <div className="flex flex-col">
          <div className="mb-1 font-bold text-white">{item.company}</div>
          <div className="text-muted-foreground">{item.description}</div>
        </div>

        <div className="flex w-fit flex-col gap-2 whitespace-nowrap">
          {item.roles.map((role) => (
            <div
              key={role.title}
              className="flex flex-col items-end text-right"
            >
              <div className="mb-1 text-white">{role.title}</div>
              <div className="text-muted-foreground">
                {role.startDate}
                {role.endDate ? ` - ${role.endDate}` : null}
                {role.isCurrent ? " - present" : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Page = () => {
  return (
    <div className="not-prose flex flex-col gap-12">
      <h1 className="mb-4 text-xl font-light text-muted-foreground">
        my journey <span className="font-bold text-white">so far...</span>
      </h1>

      <div className="-mx-4 flex flex-col gap-6">
        {TIMELINE.map((item) => (
          <TimelineItem key={item.company} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Page;
