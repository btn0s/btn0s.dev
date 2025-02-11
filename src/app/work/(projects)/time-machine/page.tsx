import { Metadata } from "next";

import coverImage from "@/assets/images/work/amex.png";
import { GetInTouchCTA, ViewMoreProjectsCTA } from "@/components/ctas";
import EntryImage from "@/components/entry-image";
import FadeBlurLoader from "@/components/fade-blur-loader";
import Mermaid from "@/components/mermaid";
import PageTitle, { PageTitleHighlight } from "@/components/page-title";
import { Separator } from "@/components/ui/separator";
import { createMetaTitle } from "@/lib/utils";

export const metadata: Metadata = {
  title: createMetaTitle("TimeMachine"),
  description:
    "A bridge system that enabled continuous feature delivery for millions of daily customer interactions while maintaining 99.9% platform reliability during modernization.",
  openGraph: {
    title: createMetaTitle("TimeMachine"),
    description:
      "A bridge system that enabled continuous feature delivery for millions of daily customer interactions while maintaining 99.9% platform reliability during modernization.",
    images: [{ url: coverImage.src }],
  },
};

export default function Page() {
  return (
    <FadeBlurLoader className="flex flex-col gap-4">
      <div className="prose prose-sm prose-invert w-full max-w-none">
        <PageTitle>
          A bridge system that enabled continuous feature delivery for{" "}
          <PageTitleHighlight block>
            millions of daily customer interactions while maintaining 99.9% reliability.
          </PageTitleHighlight>
        </PageTitle>

        <EntryImage src={coverImage.src} />

        <h2>Overview</h2>
        <p>
          American Express faced a critical challenge: how to modernize their
          customer care platform without disrupting service to millions of
          cardmembers. With their platform processing millions of interactions
          daily, even minor disruptions could significantly impact customer
          experience and business operations.
        </p>

        <p>
          TimeMachine was designed to solve this challenge through a bi-directional
          bridge system that enabled incremental React adoption within the existing
          Angular codebase. This approach allowed teams to build new features
          using modern technology while ensuring the stability of critical
          customer-facing systems.
        </p>

        <h3>Impact</h3>
        <ul>
          <li>
            <strong>Platform Reliability:</strong> Maintained 99.9% uptime across
            millions of daily customer interactions during the modernization
          </li>
          <li>
            <strong>Business Growth:</strong> Enabled the successful launch of a
            new travel vertical, expanding operations to 300+ specialized agents
          </li>
          <li>
            <strong>Development Velocity:</strong> Empowered teams to build new
            features in React without waiting for full migration, accelerating
            delivery
          </li>
          <li>
            <strong>Technical Innovation:</strong> Established a proven pattern
            for incremental modernization that's been adopted across other
            legacy systems
          </li>
        </ul>

        <h2>Technical Design</h2>
        <p>
          TimeMachine's architecture was designed for reliability at scale,
          using three core components that work together to ensure seamless
          operation across both frameworks while handling millions of daily
          interactions.
        </p>

        <h3>DOM Integration</h3>
        <p>
          The portal system enables React components to be seamlessly mounted
          within Angular's DOM, allowing teams to build new features without
          disrupting the existing application structure. This approach was
          critical for maintaining stability while enabling incremental adoption.
        </p>

        <Mermaid
          id="mermaid-1"
          title="DOM Integration"
          source={`
            flowchart TD
              subgraph Angular DOM
                D[Angular View]
                P[Portal Directive]
                M[Mount Point]
              end

              subgraph React
                C[React Component]
                Po[Portal]
              end

              subgraph Registry
                R[Portal Registry]
              end

              D -->|Create| P
              P -->|Register| R
              P -->|Create| M
              C -->|Query| R
              Po -->|Render into| M
          `}
        />

        <h3>Event Communication</h3>
        <p>
          A high-performance global event system ensures reliable communication
          between frameworks, enabling new React features to integrate naturally
          with existing Angular functionality while maintaining the platform's
          99.9% reliability target.
        </p>

        <Mermaid
          id="mermaid-2"
          title="Event System"
          source={`
            flowchart TD
              subgraph Angular
                AC[Controllers]
                AD[Directives]
              end

              subgraph Event Bus
                EB[Message Queue]
                H[Handler Registry]
              end

              subgraph React
                RC[Components]
                RH[Hooks]
              end

              AC -->|Publish| EB
              AD -->|Subscribe| EB
              RC -->|Publish| EB
              RH -->|Subscribe| EB
              RC -->|Register| H
              H -->|Fresh Handlers| EB
          `}
        />

        <h3>State Management</h3>
        <p>
          The state synchronization system maintains consistency across both
          frameworks, crucial for handling complex customer interactions that
          span multiple features. This system ensures reliable operation even
          during high-traffic periods.
        </p>

        <Mermaid
          id="mermaid-3"
          title="State Management"
          source={`
            sequenceDiagram
              participant A as Angular
              participant B as Event Bus
              participant R as React

              Note over A,R: State Update Flow
              A->>B: Emit State Change
              B->>R: Notify React
              R->>R: Update Virtual DOM
              R->>R: Refresh Handlers
              R->>B: Register New Handlers
              B->>A: Trigger Digest
              A->>A: Run Digest Cycle
              A->>B: Confirm Update
              B->>R: Sync Complete
          `}
        />

        <Separator className="my-8" />

        <div className="not-prose flex flex-col gap-4">
          <ViewMoreProjectsCTA />
          <GetInTouchCTA topic="modernizing legacy systems" />
        </div>
      </div>
    </FadeBlurLoader>
  );
}
