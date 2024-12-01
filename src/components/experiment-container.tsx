import { FC, PropsWithChildren } from "react";

export const ExperimentContainer: FC<PropsWithChildren> = ({ children }) => (
  <div className="relative flex aspect-video w-full flex-1 flex-col items-center justify-center gap-4 rounded-xl border border-white/10 bg-white/5 p-6 shadow-inner">
    {children}
  </div>
);
