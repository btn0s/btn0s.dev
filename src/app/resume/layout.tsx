import { Metadata } from "next";

import { createMetaTitle } from "@/lib/utils";

export const metadata: Metadata = {
  title: createMetaTitle("Resume"),
  description:
    "Design Engineer bridging product, design, and engineering through rapid validation. I build end-to-end solutions that empower teams and delight users.",
  openGraph: {
    title: createMetaTitle("Resume"),
    description:
      "Design Engineer bridging product, design, and engineering through rapid validation. I build end-to-end solutions that empower teams and delight users.",
    images: [
      {
        url: "https://btn0s.dev/og-share.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: createMetaTitle("Resume"),
    description:
      "Design Engineer bridging product, design, and engineering through rapid validation. I build end-to-end solutions that empower teams and delight users.",
  },
};

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
