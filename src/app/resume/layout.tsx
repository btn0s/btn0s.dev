import { Metadata } from "next";

import { createMetaTitle } from "@/lib/utils";

export const metadata: Metadata = {
  title: createMetaTitle("Resume"),
  description:
    "Senior Design Engineer specializing in rapid validation and internal tooling. I build systems that help teams work better together.",
  openGraph: {
    title: createMetaTitle("Resume"),
    description:
      "Senior Design Engineer specializing in rapid validation and internal tooling. I build systems that help teams work better together.",
  },
};

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
