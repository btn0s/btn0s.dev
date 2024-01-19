import { ReactNode } from "react";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "an experiment by @btn0s",
  description: "a small example of my usual experimentation habits.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://btn0s.dev/experiments/",
    title: "an experiment by @btn0s",
    description: "a small example of my usual experimentation habits.",
    images: [
      {
        url: "/api/og?title=an%20experiment%20by%20%40btn0s&description=a%20small%20example%20of%20my%20usual%20experimentation%20habits.",
        width: 1200,
        height: 630,
        alt: "btn0s.dev",
      },
    ],
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <div className="prose prose-invert">{children}</div>;
}
