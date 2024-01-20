import { Metadata } from "next";
import Link from "next/link";

import { getExperiments } from "@/app/api/experiments";

export const metadata: Metadata = {
  title: "✦ experiments | @btn0s",
  description:
    "This is my lab. You can find all of my experiments here. I use this space to try out new ideas and concepts.",
  openGraph: {
    title: "✦ experiments | @btn0s",
    description:
      "This is my lab. You can find all of my experiments here. I use this space to try out new ideas and concepts.",
    type: "website",
    url: "https://btn0s.dev/experiments",
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

const Page = async () => {
  const experiments = await getExperiments();

  return (
    <div className="not-prose flex flex-col gap-12">
      <p>
        This is my lab. You can find all of my experiments here. I use this
        space to try out new ideas and concepts.
      </p>
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
    </div>
  );
};

export default Page;
