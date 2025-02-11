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
  },
};

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
