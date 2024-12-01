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
    "A bi-directional bridge system that enabled incremental React adoption within a legacy Angular codebase using React Portals and event-driven communication.",
  openGraph: {
    title: createMetaTitle("TimeMachine"),
    description:
      "A bi-directional bridge system that enabled incremental React adoption within a legacy Angular codebase using React Portals and event-driven communication.",
    images: [{ url: coverImage.src }],
  },
};

export default function Page() {
  return (
    <FadeBlurLoader className="flex flex-col gap-4">
      <div className="prose prose-sm prose-invert w-full max-w-none">
        <PageTitle>
          TimeMachine: A bridge between React and Angular that{" "}
          <PageTitleHighlight block>
            enabled incremental modernization without disrupting development.
          </PageTitleHighlight>
        </PageTitle>

        <EntryImage src={coverImage.src} />

        <h2>Overview</h2>
        <p>
          American Express faced a critical challenge: how to modernize their
          customer care platform without disrupting service to millions of
          cardmembers. With a major travel vertical launch on the horizon, we
          needed to enable new feature development while gradually transitioning
          from Angular 1.x to React.
        </p>

        <h3>Impact</h3>
        <ul>
          <li>
            <strong>Successful Launch:</strong> Delivered the travel vertical on
            schedule, onboarding 300+ specialized agents to the platform
          </li>
          <li>
            <strong>Zero Downtime:</strong> Maintained 99.9% platform
            reliability during the transition to React
          </li>
          <li>
            <strong>Team Velocity:</strong> Enabled feature teams to build new
            functionality in React without waiting for full migration
          </li>
          <li>
            <strong>Technical Foundation:</strong> Established a proven pattern
            for incremental modernization of legacy systems
          </li>
        </ul>

        <h2>Technical Design</h2>
        <p>
          TimeMachine bridged Angular and React through three core components,
          enabling teams to build new features in modern technology while
          preserving the stability of existing systems.
        </p>

        <h3>DOM Integration</h3>
        <p>
          React components were seamlessly mounted within Angular&apos;s DOM
          using a portal system, allowing new features to coexist with legacy
          code without requiring structural changes to the application.
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
          A global event system enabled seamless interaction between frameworks,
          allowing new React features to integrate naturally with existing
          Angular functionality.
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
          Automatic state synchronization between frameworks ensured that both
          new and existing features remained consistent, enabling reliable
          operation of the combined system.
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
