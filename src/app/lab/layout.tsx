import { ReactNode } from "react";

import EntryPageLayout from "@/components/entry-page-layout";

export default function Layout({ children }: { children: ReactNode }) {
  return <EntryPageLayout>{children}</EntryPageLayout>;
}
