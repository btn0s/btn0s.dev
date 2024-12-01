import { FC, PropsWithChildren } from "react";

export const Experiment: FC<PropsWithChildren> = ({ children }) => (
  <div className="not-prose my-12 flex flex-col gap-4">{children}</div>
);
