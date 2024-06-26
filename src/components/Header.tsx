"use client";

import {
  AnchorHTMLAttributes,
  DetailedHTMLProps,
  FC,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";

import { MapPinIcon } from "lucide-react";
import Link from "next/link";
import { LuGithub, LuTwitter } from "react-icons/lu";
import { PiCactusFill, PiMapPin } from "react-icons/pi";

import FadeBlurLoader from "@/components/FadeBlurLoader";
import useAnimateIn from "@/hooks/useAnimateIn";

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
  const [currentDate, setCurrentDate] = useState<Date>();

  useEffect(() => {
    const updateCurrentDate = () => {
      setCurrentDate(
        new Date(
          new Date().toLocaleString(undefined, { timeZone: "America/Phoenix" }),
        ),
      );
      requestAnimationFrame(updateCurrentDate);
    };
    requestAnimationFrame(updateCurrentDate);
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 isolate z-10 flex items-center justify-center">
      <div
        className="absolute inset-0 -z-10 bg-black/5 backdrop-blur"
        style={{
          maskImage:
            "linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 30%, rgb(0,0,0) 45%)",
        }}
      ></div>
      <FadeBlurLoader className="flex max-w-md flex-1 items-center justify-between p-6">
        <Link href="/">✦ btn0s</Link>
        <div className="relative flex flex-col items-center text-xs text-white/20">
          <div>{currentDate?.toLocaleString()}</div>
          <div className="absolute top-full flex items-center gap-[2px] text-[10px] leading-[1.1]">
            <PiMapPin className="mr-[2px] inline" />
            Phoenix
          </div>
        </div>
        <div className="gap2 flex">
          <HeaderLink href="https://github.com/btn0s" target="_blank">
            <LuGithub className="size-4" />
          </HeaderLink>
          <HeaderLink href="https://twitter.com/btn0s" target="_blank">
            <LuTwitter className="size-4" />
          </HeaderLink>
        </div>
      </FadeBlurLoader>
    </div>
  );
};

export default Header;
