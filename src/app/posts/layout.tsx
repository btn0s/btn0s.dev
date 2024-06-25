import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return <div className="prose prose-invert">{children}</div>;
}
