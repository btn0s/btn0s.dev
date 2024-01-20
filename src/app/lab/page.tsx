import { redirect } from "next/navigation";

import Lab from "@/components/Lab";

export default function Page() {
  if (process.env.NODE_ENV !== "development") {
    redirect("/experiments");
  }

  return <Lab />;
}
