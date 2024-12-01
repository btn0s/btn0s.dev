import Image from "next/image";

import linkPreviewImg from "@/assets/images/link-preview.gif";
import coverImg from "@/assets/images/shots/external-link-preview.jpg";
import { Experiment } from "@/components/experiment";
import { ExperimentContainer } from "@/components/experiment-container";
import { ExternalLinkWithPreview } from "@/components/experiments/ExternalLinkWithPreview";

export const metadata = {
  title: "External link preview component",
  description:
    "A simple link preview component I designed that shows rich information about the link on hover.",
};

export default function Page() {
  return (
    <div className="prose dark:prose-invert">
      <h1>External link preview component</h1>
      <p>
        A simple link preview component I designed so that visitors could access
        rich link previews without having to leave the page.
      </p>

      <Image
        src={linkPreviewImg}
        className="-mb-3 mt-12 lg:hidden"
        alt="Link preview demo"
      />

      <div className="hidden lg:block">
        <Experiment>
          <ExperimentContainer>
            <div className="text-white">
              <ExternalLinkWithPreview
                href="https://thinkhuman.co/"
                align="center"
              >
                https://thinkhuman.co
              </ExternalLinkWithPreview>
            </div>
            <div className="opacity-50">
              hover on the link to see the preview
            </div>
          </ExperimentContainer>
        </Experiment>
      </div>
    </div>
  );
}
