import { ReactNode } from "react";

import { Analytics } from "@vercel/analytics/react";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";

import Footer from "@/components/Footer";
import Header from "@/components/Header";

import "./globals.css";

export const metadata: Metadata = {
  title: "designer, programmer, human.",
  description: "I'm a design engineer based in Phoenix, Arizona.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://btn0s.dev/",
    title: "designer, programmer, human.",
    description: "I'm a design engineer based in Phoenix, Arizona.",
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
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="my-auto flex min-h-dvh flex-col gap-12">
        <Header />
        <main className="mx-auto flex w-full max-w-screen-md flex-col gap-12 px-6 py-28">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
