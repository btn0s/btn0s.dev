"use client";

import Image from "next/image";

import imgPpl from "@/assets/images/ppl.png";
import { ScrollArea } from "@/components/ui/scroll-area";

export const ProgressiveBlur = () => {
  return (
    <div className="relative isolate aspect-video rounded-md border border-white/10 bg-black/10">
      <div className="absolute inset-x-0 top-0 z-[9] h-[57px] backdrop-blur [mask-image:linear-gradient(rgb(0,_0,_0)_55%,_rgba(0,0,0,0.8)_70%,_rgba(0,0,0,0)_100%)]" />
      <div className="absolute inset-x-0 top-0 z-10 flex justify-between px-4 py-4 mix-blend-difference">
        <span>✦ btn0s</span>
        <span>progressive blur</span>
      </div>
      <ScrollArea className="h-full w-full">
        <div className="prose p-4 pt-[calc(57px)]">
          <Image
            className="mb-2 mt-0 rounded-3xl border border-white/50"
            src={imgPpl}
            alt="ppl"
          />
          <p>
            All work and no play makes Jack a dull boy. All work and no play
            makes Jack a dull boy. All work and no play makes Jack a dull boy.
            All work and no play makes Jack a dull boy.
          </p>
        </div>
      </ScrollArea>
    </div>
  );
};
