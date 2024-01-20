"use client";

import { FC } from "react";

import Link from "next/link";

const Footer: FC = () => {
  return (
    <footer className="mt-auto flex items-center justify-between gap-2">
      <Link href="/">✦ bt norris</Link>
      <div className="gap-4text-muted-foreground flex items-center underline">
        <Link href="/posts">thoughts</Link>
        <Link href="/experiments">experiments</Link>
      </div>
    </footer>
  );
};

export default Footer;
