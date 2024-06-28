"use client";

import { redirect } from "next/navigation";

const Page = () => {
  if (process.env.NODE_ENV === "development") {
    redirect("/");
  }

  return (
    <div className="absolute inset-0 flex h-screen w-screen items-center justify-center gap-1 bg-white">
      playground
    </div>
  );
};

export default Page;
