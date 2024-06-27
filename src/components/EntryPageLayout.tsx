import { FC, PropsWithChildren, ReactNode } from "react";

import FadeBlurLoader from "@/components/FadeBlurLoader";

const EntryPageLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <FadeBlurLoader className="prose prose-sm prose-invert mx-auto w-full max-w-lg">
      {children}
    </FadeBlurLoader>
  );
};

export default EntryPageLayout;
