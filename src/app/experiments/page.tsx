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
      <div className="flex flex-col gap-5 text-muted-foreground">
        {experiments.map(({ slug, meta }) => (
          <Link
            key={slug}
            href={`/experiments/${slug}`}
            className="-mx-3 -my-2 flex flex-col rounded-md px-3 py-2 transition-colors duration-200 hover:bg-white/5"
          >
            <h3 className="text-white">{`${meta.title}`}</h3>
            <p className="text-muted-foreground">{`${meta.description}`}</p>
          </Link>
        ))}
      </div>
    </FadeBlurLoader>
  );
};

export default Page;
