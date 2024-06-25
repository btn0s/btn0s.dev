import { FC, PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

const Panel: FC<PropsWithChildren<{ className?: string; pill?: boolean }>> = ({
  children,
  className,
  pill = false,
}) => {
  return (
    <div
      className={cn(
        className,
        "relative isolate z-10 flex gap-2 overflow-hidden border bg-black p-2 shadow-lg backdrop-blur-2xl",
        {
          "rounded-full": pill,
          "rounded-lg": !pill,
        },
      )}
    >
      {children}
    </div>
  );
};

export default Panel;
