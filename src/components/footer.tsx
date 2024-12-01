"use client";

import { FC, PropsWithChildren, useEffect, useState } from "react";

import {
  BriefcaseBusinessIcon,
  FlaskConicalIcon,
  HouseIcon,
  NotebookPenIcon,
} from "lucide-react";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";

import FadeBlurLoader from "@/components/fade-blur-loader";
import { cn } from "@/lib/utils";

const Panel: FC<PropsWithChildren<{ className?: string; pill?: boolean }>> = ({
  children,
  className,
  pill = false,
}) => {
  return (
    <div className="relative overflow-hidden rounded-full bg-neutral-800 p-[1px] shadow">
      <div className="absolute left-1/2 top-0 aspect-video h-full w-2/3 -translate-x-1/2 -translate-y-1/4 bg-white opacity-20 bg-blend-multiply blur-lg"></div>
      <div
        className={cn(
          className,
          "relative isolate z-10 flex overflow-hidden bg-gradient-to-b from-neutral-800/90 to-neutral-900/90 p-2 text-neutral-100 shadow-lg",
          {
            "rounded-full": pill,
            "rounded-lg": !pill,
          },
        )}
      >
        {children}
      </div>
    </div>
  );
};

const NavLink: FC<
  PropsWithChildren<
    LinkProps & {
      isFirstChild?: boolean;
      isLastChild?: boolean;
    }
  >
> = ({ isFirstChild, isLastChild, href, children }) => {
  const [isActive, setIsActive] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (href === "/") {
      if (pathname === "/") {
        setIsActive(true);
      } else {
        setIsActive(false);
      }

      return;
    }

    if (pathname.startsWith(href as string)) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [pathname, href]);

  const handleClick = () => {
    setIsActive(true);
  };

  return (
    <Link
      href={href}
      className={cn(
        "group relative isolate h-12 w-12 shrink-0 bg-neutral-900 px-[0.5px] py-[1px] transition-colors duration-200 [webkit-tap-highlight-color:transparent] first-of-type:px-[1px] last-of-type:px-[1px]",
        {
          "rounded-l-full": isFirstChild,
          "rounded-r-full": isLastChild,
        },
      )}
      onClick={handleClick}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-0 z-10 group-active:[boxShadow:inset_0px_12px_15px_-3px_rgba(0,0,0,0.5),_inset_0px_10px_24px_0px_rgba(0,0,0,0.1)]",
          {
            "rounded-l-full": isFirstChild,
            "rounded-r-full": isLastChild,
            "[boxShadow:inset_0px_12px_15px_-3px_rgba(0,0,0,0.5),_inset_0px_10px_24px_0px_rgba(0,0,0,0.1)]":
              isActive,
          },
        )}
      ></div>
      <div
        className={cn(
          "-z-10 flex size-full items-center justify-center bg-neutral-800 group-active:scale-95 group-active:text-white/75",
          {
            "scale-[0.98] text-white/75": isActive,
            "scale-100": !isActive,
            "rounded-l-full pl-1 ": isFirstChild,
            "rounded-r-full pr-1": isLastChild,
          },
        )}
        style={{
          boxShadow: !isActive
            ? "inset 0px 12px 15px -3px rgba(0,0,0,0.2), inset 0px 10px 24px 0px rgba(0,0,0,0.1)"
            : "none",
        }}
      >
        {children}
      </div>
    </Link>
  );
};

const Footer = () => {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 flex items-center justify-center gap-2 p-6">
      <div className="absolute -inset-x-24 -bottom-24 z-[-1] h-[150%] bg-gradient-to-b from-black/50 to-black blur-2xl"></div>
      <FadeBlurLoader className="pointer-events-auto flex items-center gap-2">
        <Panel pill>
          <NavLink href="/" isFirstChild>
            <HouseIcon className="size-4" />
          </NavLink>
          <NavLink href="/work">
            <BriefcaseBusinessIcon className="size-4" />
          </NavLink>
          <NavLink href="/sketches" isLastChild>
            <NotebookPenIcon className="size-4" />
          </NavLink>
        </Panel>
      </FadeBlurLoader>
    </div>
  );
};

export default Footer;
