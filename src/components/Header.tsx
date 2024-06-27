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
import { LuGithub, LuTwitter } from "react-icons/lu";
import { PiMapPin } from "react-icons/pi";

import FadeBlurLoader from "@/components/FadeBlurLoader";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

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
  const pathname = usePathname();
  const [currentDate, setCurrentDate] = useState<Date>();
  const [formattedTime, setFormattedTime] = useState<string>("");

  const pathnameToParts = pathname.split("/");

  useEffect(() => {
    const updateCurrentDate = () => {
      setCurrentDate(
        new Date(
          new Date().toLocaleString(undefined, { timeZone: "America/Phoenix" }),
        ),
      );
      setFormattedTime(
        new Date(
          new Date().toLocaleString(undefined, { timeZone: "America/Phoenix" }),
        ).toLocaleTimeString(),
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
        <Link href="/">✦ bt norris</Link>
        {pathname === "/" ? (
          <div className="relative flex flex-col items-center text-xs text-white/20">
            <div>{formattedTime}</div>
            <div className="absolute top-full flex items-center gap-[2px] text-[10px] leading-[1.1]">
              <PiMapPin className="mr-[2px] inline size-2" />
              Phoenix
            </div>
          </div>
        ) : (
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href={`/${pathnameToParts[1]}`}
                  className="text-xs text-muted-foreground opacity-50 hover:opacity-100"
                >
                  {pathnameToParts[1]}
                </BreadcrumbLink>
              </BreadcrumbItem>
              {pathnameToParts[2] && (
                <>
                  <BreadcrumbSeparator className="text-xs text-muted-foreground opacity-50" />
                  <BreadcrumbItem>
                    <BreadcrumbLink
                      href={`/${pathnameToParts[2]}`}
                      className="text-xs text-muted-foreground opacity-50 hover:opacity-100"
                    >
                      {pathnameToParts[2]}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </>
              )}
            </BreadcrumbList>
          </Breadcrumb>
        )}
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
