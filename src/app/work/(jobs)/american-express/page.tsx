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
    "I led a team of engineers and contractors to modernize customer care platforms while driving innovation initiatives that transformed development practices.",
  openGraph: {
    title: createMetaTitle("American Express"),
    description:
      "I led a team of engineers and contractors to modernize customer care platforms while driving innovation initiatives that transformed development practices.",
    images: [{ url: coverImage.src }],
  },
};

export default function Page() {
  return (
    <FadeBlurLoader className="flex flex-col gap-4">
      <div className="prose prose-sm prose-invert w-full max-w-none">
        <PageTitle>
          I led engineering and innovation initiatives that{" "}
          <PageTitleHighlight block>
            transformed how we built and delivered customer care platforms.
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
          I joined the AskAmex organization during a critical growth period,
          leading a team of engineers and contractors to modernize their
          customer service platform. Working closely with product and design
          teams, we balanced delivering new features with establishing better
          development practices.
        </p>

        <p>
          My favorite contribution was TimeMachine — a bridge system I designed
          that became the foundation for our modernization efforts. What started
          as an experimental solution grew into a critical piece of
          infrastructure, enabling teams across the organization to confidently
          build and ship new features.
        </p>

        <h3>Key Achievements</h3>
        <ul>
          <li>
            <strong>Team Leadership:</strong> Led a mixed team of full-time
            engineers and contractors, establishing processes that improved code
            quality and deployment confidence.
          </li>
          <li>
            <strong>Product Innovation:</strong> Partnered with product and
            design to create new UI patterns for complex customer interactions,
            launching the travel vertical to 300+ specialized agents.
          </li>
          <li>
            <strong>Technical Innovation:</strong> Drove initiatives that
            transformed development practices, including TimeMachine, which
            enabled continuous feature delivery while maintaining 99.9% platform
            reliability.
          </li>
          <li>
            <strong>Process Improvement:</strong> Established new validation
            workflows with specialized agents, reducing post-deployment issues
            and improving feature quality.
          </li>
        </ul>

        <h3>Featured Project</h3>
        <p className="text-sm text-zinc-400">
          Learn more about how TimeMachine works and its impact on American
          Express's modernization journey.
        </p>
        <div className="not-prose flex flex-col gap-4">
          <GalleryCard
            href="/work/time-machine"
            title="TimeMachine"
            description="A bridge system that transformed how teams built and shipped features during platform modernization."
            image={timeMachineCoverImage}
          />
        </div>
      </div>
    </FadeBlurLoader>
  );
}
