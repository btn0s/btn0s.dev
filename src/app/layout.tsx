import { ReactNode } from "react";

import { Analytics } from "@vercel/analytics/react";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import Link from "next/link";

import Footer from "@/components/Footer";

import "./globals.css";

export const metadata: Metadata = {
  title: "✦ bt norris | btn0s.dev",
  description: "part designer, part programmer, all human.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://btn0s.dev/",
    title: "✦ bt norris",
    description: "part designer, part programmer, all human.",
    images: [
      {
        url: "https://btn0s.dev/og-share-new.png",
        width: 1200,
        height: 630,
        alt: "btn0s.dev",
      },
    ],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} flex min-h-dvh flex-col gap-12 p-6`}
      >
        <Link href="/" className="flex gap-2">
          <span>✦ bt norris</span>
          {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
          <span className="text-muted-foreground">
            // designer, programmer, human
          </span>
        </Link>
        <main className="flex max-w-lg flex-col gap-12">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
