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
    "I built a bridge between legacy and modern tech stacks that enabled continuous feature delivery while maintaining 99.9% platform reliability.",
  openGraph: {
    title: createMetaTitle("American Express"),
    description:
      "I built a bridge between legacy and modern tech stacks that enabled continuous feature delivery while maintaining 99.9% platform reliability.",
    images: [{ url: coverImage.src }],
  },
};

export default function Page() {
  return (
    <FadeBlurLoader className="flex flex-col gap-4">
      <div className="prose prose-sm prose-invert w-full max-w-none">
        <PageTitle>
          I built a bridge between legacy and modern tech stacks that{" "}
          <PageTitleHighlight block>
            enabled continuous feature delivery while maintaining 99.9% platform
            reliability.
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
          When I joined the AskAmex organization, we faced a critical challenge:
          how to modernize a heavily customized Angular 1.x codebase without
          disrupting service. With a major travel vertical launch on the horizon
          requiring extensive new features, we needed a solution that would
          enable rapid development while preserving platform stability.
        </p>

        <p>
          The solution was TimeMachine — a bi-directional bridge system I
          designed that enabled incremental React adoption within the existing
          Angular codebase. This approach allowed teams to build new features in
          React while maintaining the reliability of our legacy systems,
          successfully launching the travel vertical on schedule.
        </p>

        <h3>Key Achievements</h3>
        <ul>
          <li>
            <strong>Platform Reliability:</strong> Maintained 99.9% uptime
            across millions of daily customer interactions during the
            modernization
          </li>
          <li>
            <strong>Market Expansion:</strong> Successfully launched the travel
            vertical, expanding operations to 300+ specialized agents with zero
            downtime
          </li>
          <li>
            <strong>Technical Innovation:</strong> Established patterns for
            legacy modernization that enabled continuous feature delivery in
            React while preserving Angular stability
          </li>
          <li>
            <strong>Team Velocity:</strong> Empowered feature teams to build new
            functionality without waiting for full migration, accelerating
            delivery
          </li>
        </ul>

        <h3>Featured Project</h3>
        <div className="not-prose flex flex-col gap-4">
          <GalleryCard
            href="/work/time-machine"
            title="TimeMachine"
            description="A bi-directional bridge system enabling incremental React adoption while maintaining 99.9% platform reliability."
            image={timeMachineCoverImage}
          />
        </div>
      </div>
    </FadeBlurLoader>
  );
}
