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
          global brand.
        </p>

        <p>
          After building a successful Figma plugin that transformed our design
          workflow, I was given the opportunity to found and lead Backbone Labs
          — the company's first Design Engineering team. The Labs team focuses
          on rapid validation and de-risking of early ideas, improving internal
          developer experience, and delivering end-to-end projects
          independently.
        </p>

        <p>
          Under my leadership, Labs has become integral to Backbone's product
          development process, streamlining workflows between design and
          engineering while shipping impactful projects that drive business
          value.
        </p>

        <h3>Key Achievements</h3>
        <ul>
          <li>
            Founded and led Backbone Labs, establishing the company's first
            Design Engineering practice focused on rapid prototyping and
            internal tooling.
          </li>
          <li>
            Created a Figma plugin that{" "}
            <strong>reduced design-to-development handoff time by 80%</strong>,
            leading to the formation of the Labs team.
          </li>
          <li>
            Led development of critical internal infrastructure including
            staging environments and developer tooling.
          </li>
          <li>
            Led development for high-profile brand collaborations with{" "}
            <strong>PlayStation</strong>, <strong>Kojima Productions</strong>,
            and <strong>Post Malone</strong>.
          </li>
          <li>
            Architected and shipped a game discovery system that{" "}
            <strong>drove organic traffic up 30%</strong> through hundreds of
            optimized landing pages.
          </li>
          <li>
            Designed and implemented a streamlined checkout experience that{" "}
            <strong>increased average order value by 20%</strong>.
          </li>
        </ul>

        <h2>Featured Project</h2>
        <div className="not-prose flex flex-col gap-4">
          <GalleryCard
            href="/work/games-db-figma-plugin"
            title="Games DB Figma Plugin"
            description="A custom Figma plugin that reduced asset management time by 80%."
            image={gdbCoverImage}
            invert
          />
        </div>
      </div>
    </FadeBlurLoader>
  );
}
