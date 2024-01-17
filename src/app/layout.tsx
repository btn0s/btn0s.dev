import { ReactNode } from "react";

import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";

import bgGridImg from "@/assets/images/graph-paper.svg";

import "./globals.css";

export const metadata: Metadata = {
  title: "designer, programmer, human // btn0s.dev",
  description: "I build experiences for humans.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${GeistSans.variable} ${GeistMono.variable}`}
        style={{
          backgroundImage: `url(${bgGridImg.src})`,
          backgroundRepeat: "repeat",
          backgroundSize: "auto",
        }}
      >
        {children}
      </body>
    </html>
  );
}
