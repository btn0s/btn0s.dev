import { FC, PropsWithChildren, ReactNode } from "react";

import FadeBlurLoader from "@/components/FadeBlurLoader";

const EntryPageLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <FadeBlurLoader className="w-full max-w-screen-md">
      {children}
    </FadeBlurLoader>
  );
};

export default EntryPageLayout;
