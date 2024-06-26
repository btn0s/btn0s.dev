import { Metadata } from "next";

import EmptyPageMessage from "@/components/EmptyPageMessage";
import { createMetaTitle } from "@/lib/utils";

const TITLE = "work";
const DESCRIPTION =
  "My curriculum vitae, in a way. A selection of projects I've worked on.";

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
        url: "https://btn0s.dev/og-share-new.png",
        width: 1200,
        height: 630,
        alt: "btn0s.dev",
      },
    ],
  },
};

const Page = async () => {
  return (
    <div className="not-prose flex flex-col gap-12">
      <h1 className="text-xl text-white">
        <span className="font-light opacity-50">the journey so far, </span>
        <div className="font-bold">this is my life's work</div>
      </h1>
      <EmptyPageMessage />
    </div>
  );
};

export default Page;
