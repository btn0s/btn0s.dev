"use client";

import {
  AnchorHTMLAttributes,
  DetailedHTMLProps,
  FC,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";

import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LuGithub, LuTwitter } from "react-icons/lu";

import FadeBlurLoader from "@/components/FadeBlurLoader";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
        new Date(
          new Date().toLocaleString(undefined, {
            // timeZone: "America/Phoenix"
          }),
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
        <Link href="/" className="relative flex items-center gap-2">
          ✦ bt norris
        </Link>
        <AnimatePresence mode="popLayout">
          {pathname === "/" ? (
            <motion.div
              key="time"
              variants={{
                initial: {
                  opacity: 0,
                  filter: "blur(10px)",
                },
                animate: {
                  opacity: 1,
                  filter: "blur(0px)",
                },
              }}
              initial="initial"
              animate="animate"
              exit="initial"
            >
              <div className="relative flex flex-col items-center text-xs text-muted-foreground opacity-50">
                <div>{formattedTime}</div>
              </div>
            </motion.div>
          ) : null}
          {pathname !== "/" ? (
            <motion.div
              key="breadcrumb"
              variants={{
                initial: {
                  opacity: 0,
                  filter: "blur(10px)",
                },
                animate: {
                  opacity: 1,
                  filter: "blur(0px)",
                },
              }}
              initial="initial"
              animate="animate"
              exit="initial"
            >
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink
                      href={`/${pathnameToParts[1]}`}
                      className={cn("text-xs text-muted-foreground", {
                        "opacity-50 hover:opacity-100": pathnameToParts[2],
                      })}
                    >
                      {pathnameToParts[1]}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  {pathnameToParts[2] && (
                    <>
                      <BreadcrumbSeparator className="text-xs text-muted-foreground opacity-50" />
                      <BreadcrumbItem>
                        <BreadcrumbLink
                          href={`/${pathnameToParts[1]}/${pathnameToParts[2]}`}
                          className="text-xs text-muted-foreground"
                        >
                          {pathnameToParts[2]}
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                    </>
                  )}
                </BreadcrumbList>
              </Breadcrumb>
            </motion.div>
          ) : null}
        </AnimatePresence>
        <div className="flex">
          <HeaderLink href="https://github.com/btn0s" target="_blank">
            <LuGithub />
          </HeaderLink>
          <HeaderLink href="https://twitter.com/btn0s" target="_blank">
            <LuTwitter />
          </HeaderLink>
        </div>
      </FadeBlurLoader>
    </div>
  );
};

export default Header;
