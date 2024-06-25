"use client";

import { FC, PropsWithChildren } from "react";

import {
  FlaskConicalIcon,
  HouseIcon,
  JoystickIcon,
  NotebookPenIcon,
  SkullIcon,
} from "lucide-react";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";

import FadeBlurLoader from "@/components/FadeBlurLoader";
import Panel from "@/components/ui/panel";
import { cn } from "@/lib/utils";

const NavLink: FC<PropsWithChildren<LinkProps>> = ({ href, children }) => {
  const pathname = usePathname();

  const isActive =
    href === "/" ? pathname === "/" : pathname.includes(href as string);

  return (
    <Link href={href}>
      <div
        className={cn(
          "relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/10 transition-colors duration-200 [webkit-tap-highlight-color:transparent] before:backdrop-blur-2xl hover:scale-105 hover:bg-white/20 active:scale-95",
          {
            "bg-white text-black hover:bg-white/90": isActive,
            "bg-white/5 text-white hover:bg-white/20": !isActive,
          },
        )}
      >
        {children}
      </div>
    </Link>
  );
};

const Footer = () => {
  const pathname = usePathname();

  const isDevelopment = process.env.NODE_ENV === "development";

  return (
    <div className="fixed inset-x-0 bottom-0 flex items-center justify-center gap-2 p-6">
      <div className="pointer-events-none absolute inset-0 z-[-1] bg-gradient-to-b from-transparent to-black"></div>
      <FadeBlurLoader
        className="flex items-center gap-2"
        transition={{ delay: pathname !== "/" ? 0 : 1.5 }}
      >
        <Panel pill>
          <NavLink href="/">
            <HouseIcon className="size-4" />
          </NavLink>
          <NavLink href="/experiments">
            <FlaskConicalIcon className="size-4" />
          </NavLink>
          {isDevelopment ? (
            <>
              <NavLink href="/posts">
                <NotebookPenIcon className="size-4" />
              </NavLink>
              <NavLink href="/games">
                <JoystickIcon className="size-4" />
              </NavLink>
            </>
          ) : null}
        </Panel>
        {isDevelopment ? (
          <NavLink href="/lab">
            <SkullIcon className="size-4" />
          </NavLink>
        ) : null}
      </FadeBlurLoader>
    </div>
  );
};

export default Footer;
