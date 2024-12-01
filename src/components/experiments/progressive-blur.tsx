"use client";

import Image from "next/image";

import imgPpl from "@/assets/images/ppl.png";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ProgressiveBlur() {
  return (
    <div className="relative isolate aspect-video rounded-md border border-white/10 bg-white/5">
      <div className="absolute inset-0">
        <ScrollArea className="h-full">
          <div className="p-4">
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
      <div className="absolute inset-x-0 top-0 z-10 h-[57px] rounded-t-md bg-black/50 backdrop-blur [mask-image:linear-gradient(rgb(0,_0,_0)_55%,_rgba(0,0,0,0.8)_70%,_rgba(0,0,0,0)_100%)]" />
      <div className="absolute inset-x-0 top-0 z-20 flex justify-between px-4 py-4 text-white">
        <span>✦ bt norris</span>
        <span>progressive blur</span>
      </div>
    </div>
  );
}
