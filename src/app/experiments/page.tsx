import { Metadata } from "next";
import Link from "next/link";

import { getExperiments } from "@/app/api/experiments";
import FadeBlurLoader from "@/components/FadeBlurLoader";
import { ListCard } from "@/components/ListCard";
import { List } from "@/components/pages/List";

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
    <div className="not-prose flex flex-col gap-12">
      <h1 className="text-xl text-white">
        <span className="font-light opacity-50">
          A selection of experiments{" "}
        </span>
        <div className="font-bold">from the lab.</div>
      </h1>
      <List>
        {experiments.map(({ slug, meta }) => (
          <ListCard key={slug} meta={meta} slug={slug} section="experiments" />
        ))}
      </List>
    </div>
  );
};

export default Page;
