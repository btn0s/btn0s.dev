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
import { usePathname } from "next/navigation";
import { LuGithub, LuMail } from "react-icons/lu";

import FadeBlurLoader from "@/components/fade-blur-loader";
import { Button } from "@/components/ui/button";

const HeaderLink: FC<
  PropsWithChildren<
    DetailedHTMLProps<
      AnchorHTMLAttributes<HTMLAnchorElement>,
      HTMLAnchorElement
    >
  >
> = ({ children, ...props }) => {
  return (
    <Button asChild variant="ghost" size="icon" className="text-white">
      <a className="flex items-center justify-center" {...props}>
        {children}
      </a>
    </Button>
  );
};

const Header = () => {
  const pathname = usePathname();
  const [formattedTime, setFormattedTime] = useState<string>("");

  const pathnameToParts = pathname.split("/");

  useEffect(() => {
    const updateCurrentDate = () => {
      setFormattedTime(
        new Date(new Date().toLocaleString()).toLocaleTimeString(),
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
      <FadeBlurLoader className="flex w-full max-w-screen-md flex-1 items-center justify-between px-6 pt-2 lg:p-6">
        <Link
          href="/"
          className="relative flex w-[79px] items-center gap-2 leading-none"
        >
          ✦ bt norris
        </Link>
        <div className="relative flex flex-1 items-center justify-center">
          <div className="relative flex flex-col items-center text-xs leading-none text-muted-foreground opacity-50">
            {pathname === "/" ? (
              <FadeBlurLoader>{formattedTime}</FadeBlurLoader>
            ) : null}
            {pathnameToParts[1] === "work" ? (
              <FadeBlurLoader>work</FadeBlurLoader>
            ) : null}
            {pathnameToParts[1] === "notes" ? (
              <FadeBlurLoader>notes</FadeBlurLoader>
            ) : null}
            {pathnameToParts[1] === "lab" ? (
              <FadeBlurLoader>lab</FadeBlurLoader>
            ) : null}
          </div>
        </div>
        <div className="flex w-[79px] justify-end">
          <HeaderLink href="https://github.com/btn0s" target="_blank">
            <LuGithub />
          </HeaderLink>
          <HeaderLink href="mailto:brendan.t.norris@gmail.com" target="_blank">
            <LuMail />
          </HeaderLink>
        </div>
      </FadeBlurLoader>
    </div>
  );
};

export default Header;
