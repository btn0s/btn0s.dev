import { Metadata } from "next";
import Link from "next/link";

import { getExperiments } from "@/app/api/experiments";
import FadeBlurLoader from "@/components/FadeBlurLoader";

export const metadata: Metadata = {
  title: "✦ experiments | @btn0s",
  description:
    "Welcome to the lab. I'm always tinkering and usually leaving things here for posterity. Enjoy!",
  openGraph: {
    title: "✦ experiments | @btn0s",
    description:
      "Welcome to the lab. I'm always tinkering and usually leaving things here for posterity. Enjoy!",
    type: "website",
    url: "https://btn0s.dev/experiments",
    images: [
      {
        url: "https://btn0s.dev/og-share-new.png",
        width: 1200,
        height: 630,
        alt: "btn0s.dev",
      },
    ],
  },
};

const Page = async () => {
  const experiments = await getExperiments();

  return (
    <FadeBlurLoader
      className="not-prose flex flex-col gap-12"
      transition={{ delay: 0.25 }}
    >
      <h1 className="text-xl text-white">
        <span className="font-light opacity-50">
          These are my experiments.{" "}
        </span>
        <span className="font-bold">Straight from the lab.</span>
      </h1>
      <div className="flex flex-col gap-2">
        {experiments.map(({ slug, meta }) => (
          <Link
            key={slug}
            href={`/experiments/${slug}`}
            className="flex flex-col gap-1 rounded-md border border-border bg-white/5 p-3 text-sm transition-colors duration-200 hover:bg-white/10"
          >
            <h3 className="text-white">{meta.title}</h3>
            <p className="max-w-[95%] text-pretty text-xs text-muted-foreground">
              {meta.description}
            </p>
          </Link>
        ))}
      </div>
    </FadeBlurLoader>
  );
};

export default Page;
