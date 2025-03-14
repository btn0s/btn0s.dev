import { ArrowRight, ExternalLinkIcon } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import amexImage from "@/assets/images/work/amex.png";
import backboneImage from "@/assets/images/work/backbone-share-card.png";
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
        title: "Web Designer/Developer",
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
          group: item.href,
        },
      )}
    >
      {item.href ? (
        <Link href={item.href} className="absolute inset-0 z-10" />
      ) : null}
      {item.image ? (
        <div className="relative isolate aspect-video overflow-hidden rounded-md border border-white/10">
          <Image
            src={item.image}
            alt={item.company}
            className="h-full w-full object-cover transition duration-300 md:group-hover:scale-[101%]"
          />
        </div>
      ) : (
        <Separator />
      )}
      <div className="flex flex-1 justify-between gap-12 px-1">
        <div className="flex flex-col">
          <div className="mb-1 font-bold text-white">{item.company}</div>
          <div className="mb-4 text-muted-foreground">{item.description}</div>
          {item.href ? (
            <div className="mt-auto flex w-fit items-center justify-center gap-1 text-muted-foreground transition duration-300 md:group-hover:text-white">
              Learn more <ArrowRight className="h-3 w-3" />
            </div>
          ) : null}
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
      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-light text-muted-foreground">
          my journey <span className="font-bold text-white">so far...</span>
        </h1>
        <Link
          href="/resume"
          className="flex w-fit items-center gap-1 text-xs text-muted-foreground opacity-50 hover:text-white"
        >
          resume <ExternalLinkIcon className="h-3 w-3 " />
        </Link>
      </div>
      <div className="-mx-4 flex flex-col gap-6">
        {TIMELINE.map((item) => (
          <TimelineItem key={item.company} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Page;
