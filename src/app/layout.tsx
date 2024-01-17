import { ReactNode } from "react";

import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";

import bgGridImg from "@/assets/images/graph-paper.svg";

import "./globals.css";

export const metadata: Metadata = {
  title: "designer, programmer, human // btn0s.dev",
  description: "I build experiences for humans.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://btn0s.dev/",
    title: "designer, programmer, human // btn0s.dev",
    description: "I build experiences for humans.",
    images: [
      {
        url: "https://btn0s.dev/og-share.png",
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
      <body className={`${GeistSans.variable} ${GeistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
