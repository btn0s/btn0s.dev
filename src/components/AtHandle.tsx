import { FC } from "react";

import { cn } from "@/lib/utils";

const AtHandle: FC<{
  value: string;
  className?: string;
}> = ({ value, className }) => {
  return (
    <div className={cn("text-xs text-muted-foreground opacity-50", className)}>
      @{value.toLowerCase()}
    </div>
  );
};

export default AtHandle;
