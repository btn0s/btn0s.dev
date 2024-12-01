import { ArrowRight } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

import gdbCoverImage from "@/assets/images/shots/gdb-cover.png";
import coverImage from "@/assets/images/work/backbone-share-card.webp";
import EntryImage from "@/components/EntryImage";
import FadeBlurLoader from "@/components/FadeBlurLoader";
import PageTitle, { PageTitleHighlight } from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import { createMetaTitle } from "@/lib/utils";
import GalleryCard from "@/components/gallery-card";
import { EntryType } from "@/types";

export const metadata: Metadata = {
  title: createMetaTitle("Backbone"),
  description:
    "I led frontend development a world-class ecommerce experience, and a built design engineering program zero to one.",
  openGraph: {
    title: createMetaTitle("Backbone"),
    description:
      "I led frontend development a world-class ecommerce experience, and a built design engineering program zero to one.",
    images: [{ url: coverImage.src }],
  },
};

export default function Page() {
  return (
    <FadeBlurLoader className="flex flex-col gap-4">
      <div className="prose prose-sm prose-invert w-full max-w-none">
        <PageTitle>
          I led front-end development of a global-scale ecommerce store,{" "}
          <PageTitleHighlight block>
            and became the company&apos;s first design engineer.
          </PageTitleHighlight>
        </PageTitle>

        <EntryImage src={coverImage.src} />

        <h2>Overview</h2>
        <p>
          Backbone is a market leader in the handheld gaming space, and has
          pioneered an entirely new class of gaming experiences with our
          seamless software experience. We were #1 on the app store on Christmas
          2023, and are sold worldwide.
        </p>

        <p>
          I joined Backbone as the 2nd engineer on the web team and led multiple
          initiatives that helped launch Backbone into the global market.
        </p>

        <p>
          After 2 years on the web team I transitioned into design engineering
          where I built a program from the ground up.
        </p>

        <h3>Highlights</h3>
        <ul>
          <li>
            Built a custom Figma plugin that{" "}
            <strong>reduced asset management time by 80%</strong>.
          </li>
          <li>
            Led the development of custom product experiences for brand
            partnerships like <strong>Playstation</strong>,{" "}
            <strong>Kojima</strong> and <strong>Post Malone</strong>.
          </li>
          <li>
            Shipped hundreds of game detail pages that{" "}
            <strong>increased organic traffic by 30%</strong>.
          </li>
          <li>
            Designed and built a custom shopping cart that increased AOV by 20%.
          </li>
        </ul>

        <h2>Related Projects</h2>
        <div className="not-prose flex flex-col gap-4">
          <GalleryCard
            href="/work/games-db-figma-plugin"
            title="Games DB Figma Plugin"
            description="A custom Figma plugin that reduced asset management time by 80%."
            image={gdbCoverImage}
          />
        </div>
      </div>
    </FadeBlurLoader>
  );
}
