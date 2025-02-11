import { Metadata } from "next";

import gdbCoverImage from "@/assets/images/shots/gdb-cover.png";
import coverImage from "@/assets/images/work/backbone-share-card.png";
import EntryImage from "@/components/entry-image";
import FadeBlurLoader from "@/components/fade-blur-loader";
import GalleryCard from "@/components/gallery-card";
import PageTitle, { PageTitleHighlight } from "@/components/page-title";
import { createMetaTitle } from "@/lib/utils";

export const metadata: Metadata = {
  title: createMetaTitle("Backbone"),
  description:
    "I led frontend development of a global-scale ecommerce store and established the company's design engineering practice.",
  openGraph: {
    title: createMetaTitle("Backbone"),
    description:
      "I led frontend development of a global-scale ecommerce store and established the company's design engineering practice.",
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
            and established the company&apos;s design engineering practice.
          </PageTitleHighlight>
        </PageTitle>

        <EntryImage src={coverImage.src} />

        <h2>Overview</h2>
        <p>
          Backbone is revolutionizing mobile gaming with premium controllers and
          seamless software experiences. Our products are sold worldwide, and we
          reached #1 on the App Store during Christmas 2023.
        </p>

        <p>
          I joined Backbone as the second engineer on the web team, where I
          architected key systems that helped scale the company from startup to
          global brand. Working with Next.js and headless Shopify, we built a
          platform that now serves customers worldwide.
        </p>

        <p>
          My favorite contribution started as an experiment: a Figma plugin to
          help our design team work more efficiently. After reducing asset
          management time by 80%, this led to founding Backbone Labs — the
          company's first Design Engineering team. We focus on rapid validation,
          internal tooling, and shipping end-to-end projects independently.
        </p>

        <p>
          Under my leadership, Labs has become integral to Backbone's product
          development process, streamlining workflows between design and
          engineering while shipping impactful projects that drive business
          value.
        </p>

        <h3 className="mb-4">Key Achievements</h3>
        <ul>
          <li>
            <strong>Platform Architecture:</strong> Led development of
            Backbone's global ecommerce platform, implementing systems that
            drove significant revenue growth through optimized landing pages and
            intelligent cart features.
          </li>
          <li>
            <strong>Team Leadership:</strong> Founded and led Backbone Labs,
            establishing the company's first Design Engineering practice focused
            on rapid prototyping and internal tooling.
          </li>
          <li>
            <strong>Developer Experience:</strong> Created critical internal
            infrastructure including a Figma plugin that reduced design handoff
            time by 80% and staging environments that increased shipping
            confidence.
          </li>
          <li>
            <strong>Brand Growth:</strong> Led development for high-profile
            collaborations with PlayStation, Kojima Productions, and Post
            Malone, significantly expanding our market presence.
          </li>
        </ul>

        <h3>Featured Project</h3>
        <p className="text-sm text-zinc-400">
          Learn more about how the Games DB Figma plugin transformed our design
          team's workflow and led to the formation of Backbone Labs.
        </p>
        <div className="not-prose flex flex-col gap-4">
          <GalleryCard
            href="/work/games-db-figma-plugin"
            title="Games DB Figma Plugin"
            description="A custom Figma plugin that reduced asset management time by 80% and became an essential part of the design team's workflow."
            image={gdbCoverImage}
            invert
          />
        </div>
      </div>
    </FadeBlurLoader>
  );
}
