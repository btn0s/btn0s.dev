import Image from "next/image";

import linkPreviewImg from "@/assets/images/link-preview.gif";
import progressiveBlurImg from "@/assets/images/progressive-blur.png";
import personalSiteRedesignImage01 from "@/assets/images/shots/personal-site-redesign-01.png";
import GalleryCard from "@/components/gallery-card";
import PageTitle, { PageTitleHighlight } from "@/components/page-title";

export default function Page() {
  return (
    <div>
      <PageTitle>
        a peek at the pages{" "}
        <PageTitleHighlight block>of my sketchbook</PageTitleHighlight>
      </PageTitle>
      <div className="-mx-24 grid grid-cols-1 gap-4 md:grid-cols-2">
        <GalleryCard
          href="/sketches/personal-site-redesign"
          title="Personal Site Redesign"
          description="Design iterations exploring different approaches to my personal site"
          image={personalSiteRedesignImage01}
          invert
        />
        <GalleryCard
          href="/sketches/progressive-blur"
          title="Progressive Blur Effect"
          description="A smooth transition from solid to transparent with consistent blur"
          image={progressiveBlurImg}
          invert
        />
        <GalleryCard
          href="/sketches/external-link-preview"
          title="External Link Preview"
          description="Rich link previews without leaving the page"
          image={linkPreviewImg}
        />
      </div>
    </div>
  );
}
