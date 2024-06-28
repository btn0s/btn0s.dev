import { FC, PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

export const PageTitleHighlight: FC<
  PropsWithChildren<{
    block?: boolean;
  }>
> = ({ children, block }) => {
  return (
    <span
      className={cn("font-bold text-white", {
        block: block,
      })}
    >
      {children}
    </span>
  );
};

const PageTitle: FC<PropsWithChildren<{}>> = ({ children }) => {
  return <h1 className="mb-10 font-light text-muted-foreground">{children}</h1>;
};

export default PageTitle;
