"use client";

import Image from "next/image";

import imgPpl from "@/assets/images/ppl.png";
import { ScrollArea } from "@/components/ui/scroll-area";

export const ProgressiveBlur = () => {
  return (
    <div className="not-prose relative isolate aspect-video rounded-md border border-white/10 bg-white/5">
      <div className="absolute inset-x-0 top-0 z-[9] h-[57px] rounded-t-md bg-black/50 backdrop-blur [mask-image:linear-gradient(rgb(0,_0,_0)_55%,_rgba(0,0,0,0.8)_70%,_rgba(0,0,0,0)_100%)]" />
      <div className="absolute inset-x-0 top-0 z-10 flex justify-between px-4 py-4 text-white">
        <span>✦ bt norris</span>
        <span>progressive blur</span>
      </div>
      <ScrollArea className="h-full w-full">
        <div className="prose p-4 pt-[calc(57px)]">
          <Image
            className="mb-4 mt-0 rounded-3xl border border-white/50"
            src={imgPpl}
            alt="ppl"
          />
          <Image
            className="mb-0 rounded-3xl border border-white/50"
            src={imgPpl}
            alt="ppl"
          />
        </div>
      </ScrollArea>
    </div>
  );
};
