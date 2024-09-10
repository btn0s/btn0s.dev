import { ReactNode } from "react";

export default function StudioLayout({ children }: { children: ReactNode }) {
  return <div className="fixed inset-0 z-10">{children}</div>;
}
