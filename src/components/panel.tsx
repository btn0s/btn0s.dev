import { FC, PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

export const Panel: FC<
  PropsWithChildren<{ className?: string; pill?: boolean }>
> = ({ children, className, pill = false }) => {
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
