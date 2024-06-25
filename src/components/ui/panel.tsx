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
        "relative isolate z-10 flex gap-2 overflow-hidden border p-2 shadow-lg after:absolute after:inset-0 after:-z-10 after:bg-white/5 after:backdrop-blur-2xl",
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
