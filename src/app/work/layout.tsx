import { ReactNode } from "react";

import FadeBlurLoader from "@/components/FadeBlurLoader";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <FadeBlurLoader className="prose prose-invert">{children}</FadeBlurLoader>
  );
}
