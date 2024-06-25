"use client";

import {
  AnchorHTMLAttributes,
  DetailedHTMLProps,
  FC,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";

import Link from "next/link";
import { LuGithub, LuTwitter } from "react-icons/lu";

const HeaderLink: FC<
  PropsWithChildren<
    DetailedHTMLProps<
      AnchorHTMLAttributes<HTMLAnchorElement>,
      HTMLAnchorElement
    >
  >
> = ({ children, ...props }) => {
  return (
    <a
      className="flex size-8 items-center justify-center rounded-full hover:bg-white/10"
      {...props}
    >
      {children}
    </a>
  );
};

const Header = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const updateCurrentDate = () => {
    setCurrentDate(new Date());
  };

  useEffect(() => {
    requestAnimationFrame(updateCurrentDate);
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 isolate z-10 flex items-center justify-between p-6">
      <div
        className="absolute inset-0 -z-10 bg-black/5 backdrop-blur"
        style={{
          maskImage:
            "linear-gradient(rgb(0,0,0) 55%, rgba(0,0,0,0.8) 70%, rgba(0,0,0,0) 100%)",
        }}
      ></div>
      <Link href="/">✦ btn0s</Link>
      {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
      <div className="text-xs text-white/20">
        {currentDate.toLocaleString()}
      </div>
      <div className="gap2 flex">
        <HeaderLink href="https://github.com/btn0s" target="_blank">
          <LuGithub className="size-4" />
        </HeaderLink>
        <HeaderLink href="https://twitter.com/btn0s" target="_blank">
          <LuTwitter className="size-4" />
        </HeaderLink>
      </div>
    </div>
  );
};

export default Header;
