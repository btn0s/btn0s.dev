import { ReactNode } from "react";

import { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "an experiment by @btn0s",
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main>
      <div className="prose prose-invert">{children}</div>
      <Link href="/" className="flex gap-2 pt-24">
        <span>✦ bt norris</span>
        {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
        <span className="text-muted-foreground">
          // designer, programmer, human
        </span>
      </Link>
    </main>
  );
}
