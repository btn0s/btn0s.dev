import { Metadata } from "next";
import Image from "next/image";

import appCloseup from "@/assets/images/shots/gdb-app-closeup.png";
import coverImage from "@/assets/images/shots/gdb-cover.png";
import feedbackImage from "@/assets/images/shots/gdb-feedback.png";
import pluginCloseup from "@/assets/images/shots/gdb-plugin-closeup.png";
import backboneImage from "@/assets/images/work/backbone-share-card.webp";
import { GetInTouchCTA, ViewMoreWorkCTA } from "@/components/ctas";
import FadeBlurLoader from "@/components/fade-blur-loader";
import ImageWithCaption from "@/components/image-with-caption";
import Mermaid from "@/components/mermaid";
import PageTitle, { PageTitleHighlight } from "@/components/page-title";
import { Separator } from "@/components/ui/separator";
import { createMetaTitle } from "@/lib/utils";

export const metadata: Metadata = {
  title: createMetaTitle("Streamlining Game Asset Management"),
  description:
    "I built a custom Figma plugin that reduced asset management time by 80% and became an essential part of the design team's workflow.",
  openGraph: {
    title: createMetaTitle("Streamlining Game Asset Management"),
    description:
      "I built a custom Figma plugin that reduced asset management time by 80% and became an essential part of the design team's workflow.",
    images: [{ url: coverImage.src }],
  },
};

export default function Page() {
  return (
    <FadeBlurLoader className="flex flex-col gap-4">
      <PageTitle>
        I built a design system tool that{" "}
        <PageTitleHighlight block>
          reduced asset management time by 80%.
        </PageTitleHighlight>
      </PageTitle>

      <Image
        src={coverImage}
        alt="screenshot of the figma plugin"
        className="mb-4 rounded-lg"
      />

      <div className="prose prose-sm prose-invert w-full max-w-none">
        <h2>Overview</h2>

        <div className="mb-3 flex items-center gap-2 text-xs">
          <strong>My Role:</strong>
          <span>Project Lead, Design Engineer</span>
        </div>

        <p>
          Backbone is all about creating mind-blowing gaming experiences. The
          gaming industry is a content-first industry, and the design team at
          Backbone has to work with a lot of game assets and metadata to bring
          these experiences to life.
        </p>

        <p>
          I worked with the designers and discovered that they were spending a
          lot of time and effort manually searching, downloading, and importing
          these assets. I developed a custom Figma plugin to integrate the
          assets we had in the Backbone Games DB directly into the design
          team&apos;s workflow.
        </p>

        <h3>Impact</h3>
        <p>
          This plugin has become a core part of the design team&apos;s workflow:
        </p>
        <ul>
          <li>
            <strong>Reduced time spent searching for assets by 80%</strong>{" "}
            since designers no longer have to search for assets online or import
            them manually.
          </li>
          <li>
            <strong>Saved designers over 5 hours per week</strong> on average,
            allowing them to focus on more creative work.
          </li>
          <li>
            <strong>Adopted by the entire design team</strong> and has become an
            essential tool for their daily work.
          </li>
        </ul>

        <hr />

        <h2>Process</h2>

        <h3>Designers were wasting time finding game assets</h3>
        <p>
          At the first offsite I attended with the Backbone team, I met with
          some of the designers and learned about their workflow and the
          challenges they faced. One of the biggest pain points they mentioned
          was the time-consuming process of searching for game assets and
          metadata online and importing them into Figma.
        </p>

        <Mermaid
          id="mermaid-0"
          title="existing workflow"
          source={`
            graph LR
                A[Open Web Browser]
                A --> C[Search Google for Assets]
                C --> D[Verify Assets]
                D --> E[Download Assets]
                E --> F[Import to Figma]
          `}
        />

        <h3>The solution: a custom Figma plugin</h3>
        <p>
          After identifying the problem, I worked with the design team to
          establish a few goals for the project:
        </p>
        <ul>
          <li>
            Automate the process of importing game assets and metadata into
            Figma.
          </li>
          <li>
            Ensure designers are always working with the most up-to-date data
            (so that it matches what&apos;s in the app).
          </li>
          <li>
            Seamlessly integrate with the design team&apos;s existing workflow.
          </li>
        </ul>

        <p>
          With the goals established it was fairly obvious that the best
          solution was to build a custom Figma plugin that would connect the
          design team directly to the game assets they needed.
        </p>

        <Mermaid
          id="mermaid-1"
          title="ideal workflow"
          source={`
            graph LR
                A[Run Plugin]
                A --> B[Search for a game]
                B --> C[Insert or Copy Assets]
                C --> D[Done]
          `}
        />

        <h3>Keeping things delightful, contextual, and on-brand</h3>
        <p>
          It was important to me that the plugin be delightful to use, but also
          feel like a natural extension of the existing design language used in
          the Backbone app. I wanted the designers to be able to visualize how
          the assets would look in production, adding a layer of
          &quot;function&quot; to the &quot;form&quot; of the plugin and
          resulting in a more holistic design.
        </p>

        <ImageWithCaption
          src={coverImage}
          alt="screenshot of the figma plugin"
          className="mb-4"
        />

        <div className="mb-4 grid gap-4 md:grid-cols-2">
          <ImageWithCaption
            src={appCloseup}
            alt="screenshot of the backbone app"
            className="mb-1 rounded-lg"
          />
          <ImageWithCaption
            src={pluginCloseup}
            alt="screenshot of the figma plugin"
            className="mb-1 rounded-lg"
          />
        </div>

        <h3>React, TypeScript, and Figma&apos;s plugin API</h3>
        <p>
          I chose this tech stack mainly because it allowed me to build the
          plugin quickly and efficiently. React and TypeScript are both tools
          I&apos;m very comfortable with, and Figma&apos;s Plugin API made it
          easy to interact with the design tool to manage inserting images and
          text into the canvas.
        </p>

        <p>
          To ensure designers are always working with the most up-to-date data,
          I connected the plugin to the same data source used by the app: the
          Backbone Games DB. For the search functionality, I used Algolia&apos;s
          instant search to quickly find the game assets and metadata designers
          were looking for.
        </p>

        <Mermaid
          id="mermaid-2"
          title="the architecture"
          source={`
            flowchart TD
            subgraph Databases
                A[Games DB]
                B[Algolia]
            end

            subgraph APIs
                C[GraphQL API]
                F[Algolia Client]
            end

            subgraph Clients
                D[Backbone App]
                E[Figma Plugin]
            end

            A -->|Game Metadata| C
            C -->|Game Data| D
            C -->|Game Data| E
            B -->|Search Data| F
            F -->|Search Data| D
            F -->|Search Data| E
          `}
        />

        <h3>Future Improvements</h3>
        <p>
          Since launching the plugin, I&apos;ve gotten a lot of great feedback
          from the design team.
        </p>

        <ImageWithCaption
          src={feedbackImage}
          alt="feedback from the design team"
          className="mb-4"
        />

        <p>
          Some of these items have been shipped since writing this post, and
          others are in the works. The backlog is always growing, and I&apos;m
          excited to continue improving the plugin and making it an even more
          valuable tool for the design team.
        </p>

        <h2>Reflections</h2>
        <p>
          Building the Games DB Figma plugin was a great opportunity to work
          closely with the design team and help them solve a real problem they
          were facing. I&apos;m proud of the impact it&apos;s had on their
          workflow and excited to continue improving it in the future.
        </p>
      </div>

      <Separator className="my-8" />

      <div className="flex flex-col gap-4">
        <ViewMoreWorkCTA
          href="/work/backbone"
          projectName="Backbone"
          imageSrc={backboneImage}
        />
        <GetInTouchCTA topic="custom Figma plugins" />
      </div>
    </FadeBlurLoader>
  );
}
