import { Metadata } from "next";

import coverImage from "@/assets/images/work/amex.png";
import timeMachineCoverImage from "@/assets/images/work/amex.png";
import EntryImage from "@/components/entry-image";
import FadeBlurLoader from "@/components/fade-blur-loader";
import GalleryCard from "@/components/gallery-card";
import PageTitle, { PageTitleHighlight } from "@/components/page-title";
import { createMetaTitle } from "@/lib/utils";

export const metadata: Metadata = {
  title: createMetaTitle("American Express"),
  description:
    "I led engineering initiatives to modernize customer care platforms and built a bridge between legacy and modern tech stacks.",
  openGraph: {
    title: createMetaTitle("American Express"),
    description:
      "I led engineering initiatives to modernize customer care platforms and built a bridge between legacy and modern tech stacks.",
    images: [{ url: coverImage.src }],
  },
};

export default function Page() {
  return (
    <FadeBlurLoader className="flex flex-col gap-4">
      <div className="prose prose-sm prose-invert w-full max-w-none">
        <PageTitle>
          I led engineering initiatives to modernize customer care platforms,{" "}
          <PageTitleHighlight block>
            and built a bridge between legacy and modern tech stacks.
          </PageTitleHighlight>
        </PageTitle>

        <EntryImage src={coverImage.src} />

        <h2>Overview</h2>
        <p>
          American Express is a Fortune 100 financial services company serving
          over 100 million cardmembers. Their customer care platform processes
          millions of interactions daily through mobile, web, and voice
          channels.
        </p>

        <p>
          I joined the AskAmex organization to help modernize their customer
          service platform. The system was built on a heavily customized Angular
          1.x codebase with significant technical debt. With an upcoming travel
          vertical launch requiring extensive new features, we needed a way to
          modernize without disrupting development or risking platform
          stability.
        </p>

        <p>
          I designed and implemented TimeMachine, a bidirectional bridge system
          that enabled incremental React adoption within the existing Angular
          codebase. This technical approach allowed us to build new features in
          React while maintaining the stability of our legacy systems,
          successfully launching the travel vertical on schedule.
        </p>

        <h3>Key Achievements</h3>
        <ul>
          <li>
            Successfully launched a new travel vertical that{" "}
            <strong>expanded operations to 300+ specialized agents</strong> and
            unlocked an entirely new market segment.
          </li>
          <li>
            Built TimeMachine, a bi-directional bridge system that{" "}
            <strong>enabled continuous feature delivery</strong> during a major
            platform modernization.
          </li>
          <li>
            Delivered new web chat capabilities and travel features with{" "}
            <strong>zero downtime</strong> while transitioning from Angular to
            React.
          </li>
          <li>
            Established a proven path for modernization that{" "}
            <strong>maintained 99.9% platform reliability</strong> across
            millions of daily customer interactions.
          </li>
        </ul>

        <h3>Featured Project</h3>
        <div className="not-prose flex flex-col gap-4">
          <GalleryCard
            href="/work/time-machine"
            title="TimeMachine"
            description="A bi-directional bridge system that enabled incremental React adoption within a legacy Angular codebase."
            image={timeMachineCoverImage}
          />
        </div>
      </div>
    </FadeBlurLoader>
  );
}
