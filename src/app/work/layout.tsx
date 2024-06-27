import { ReactNode } from "react";

import EntryPageLayout from "@/components/EntryPageLayout";

export default function Layout({ children }: { children: ReactNode }) {
  return <EntryPageLayout>{children}</EntryPageLayout>;
}
