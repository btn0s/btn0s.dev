import { Metadata } from "next";

import coverImage from "@/assets/images/work/amex.png";
import EntryImage from "@/components/EntryImage";
import FadeBlurLoader from "@/components/FadeBlurLoader";
import PageTitle, { PageTitleHighlight } from "@/components/PageTitle";
import { createMetaTitle } from "@/lib/utils";

export const metadata: Metadata = {
  title: createMetaTitle("American Express"),
  description:
    "I built travel concierge features using modern code in a legacy tech stack",
  openGraph: {
    title: createMetaTitle("American Express"),
    description:
      "I built travel concierge features using modern code in a legacy tech stack",
    images: [{ url: coverImage.src }],
  },
};

export default function Page() {
  return (
    <FadeBlurLoader className="flex flex-col gap-4">
      <div className="prose prose-sm prose-invert w-full max-w-none">
        <PageTitle>
          I led a team of engineers expanding customer care capabilities{" "}
          <PageTitleHighlight>
            and built a bridge to modernize a (very) legacy tech stack.
          </PageTitleHighlight>
        </PageTitle>

        <EntryImage src={coverImage.src} />

        <h2>Overview</h2>
        <p>
          American Express (&quot;Amex&quot;) is a global financial services
          company providing world-class credit cards, charge cards, and travel
          services to consumers and businesses worldwide.
        </p>

        <p>
          I joined the AskAmex org to help modernize and expand the capabilities
          of the internal &quot;AGT&quot; tool, used by customer care
          professionals (CCPs) to manage incoming chats from the Amex mobile
          apps. This app was built on Angular 1.x.
        </p>

        <p>
          I led a team of engineers across multiple initiatives, including
          building new travel concierge features, launching web chat
          capabilities, and modernizing and hardening the core AskAmex platform.
        </p>

        <h3>Highlights</h3>
        <ul>
          <li>
            Architected and built a bidirectional &quot;bridge&quot; system that
            allowed us to incrementally adopt React and build new features
            seamlessly into the legacy code without stopping product work.
          </li>
          <li>
            Used my &quot;bridge&quot; system to implement new travel concierge
            features that enabled us to onboard 300+ travel CCPs and fold a new
            market into the AGT tool.
          </li>
          <li>
            Launched web chat capabilities that allowed CCPs to chat with
            customers on the web, expanding the capabilities of the AGT CCPs and
            enabling them to provide better customer service.
          </li>
        </ul>
      </div>
    </FadeBlurLoader>
  );
}
