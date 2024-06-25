"use client";

import { FC, PropsWithChildren } from "react";

import {
  FlaskConicalIcon,
  HouseIcon,
  MailPlusIcon,
  NotebookPenIcon,
} from "lucide-react";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";

import FadeBlurLoader from "@/components/FadeBlurLoader";
import Panel from "@/components/ui/panel";
import { cn } from "@/lib/utils";

const NavLink: FC<PropsWithChildren<LinkProps>> = ({ href, children }) => {
  const pathname = usePathname();

  return (
    <Link href={href}>
      <div
        className={cn(
          "relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/10 transition-colors duration-200 [webkit-tap-highlight-color:transparent] before:backdrop-blur-2xl hover:scale-105 hover:bg-white/20 active:scale-95",
          {
            "bg-white text-black hover:bg-white/90": pathname === href,
            "bg-white/5 text-white hover:bg-white/20": pathname !== href,
          },
        )}
      >
        {children}
      </div>
    </Link>
  );
};

const Footer = () => {
  return (
    <div className="fixed inset-x-0 bottom-0 flex items-center justify-center gap-2 p-6">
      <div
        className="absolute inset-x-0 bottom-0 h-1/2 rotate-180 bg-black/5 backdrop-blur-2xl"
        style={{
          maskImage:
            "linear-gradient(rgb(0,0,0) 50%, rgba(0,0,0,0.8) 70%, rgba(0,0,0,0) 100%)",
        }}
      ></div>
      <FadeBlurLoader>
        <Panel pill>
          <NavLink href="/">
            <HouseIcon className="size-4" />
          </NavLink>
          {/*<NavLink href="/thoughts">*/}
          {/*  <NotebookPenIcon className="size-4" />*/}
          {/*</NavLink>*/}
          <NavLink href="/experiments">
            <FlaskConicalIcon className="size-4" />
          </NavLink>
        </Panel>
      </FadeBlurLoader>
    </div>
  );
};

export default Footer;
