import { ReactNode } from "react";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "an experiment by @btn0s",
};

export default function Layout({ children }: { children: ReactNode }) {
  return <main className="prose prose-invert">{children}</main>;
}
