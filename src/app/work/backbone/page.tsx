import { Metadata } from "next";

import coverImage from "@/assets/images/work/backbone-share-card.webp";
import EntryImage from "@/components/EntryImage";
import FadeBlurLoader from "@/components/FadeBlurLoader";
import PageTitle, { PageTitleHighlight } from "@/components/PageTitle";
import { createMetaTitle } from "@/lib/utils";

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
          <PageTitleHighlight>
            and built a design engineering program zero to one.
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
            Built a Figma plugin for designers that reduces asset management
            friction and became a core part of their daily workflow.
          </li>
          <li>
            Led the development of custom product experiences for brand
            partnerships like Playstation, Kojima and Post Malone.
          </li>
          <li>
            Shipped hundreds of game detail pages that increased organic traffic
            by 30%.
          </li>
          <li>
            Designed and built a custom shopping cart that increased AOV by 20%.
          </li>
        </ul>
      </div>
    </FadeBlurLoader>
  );
}
