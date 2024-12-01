"use client";

import { useState } from "react";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

import personalSiteRedesignImage01 from "@/assets/images/shots/personal-site-redesign-01.png";
import personalSiteRedesignImage02 from "@/assets/images/shots/personal-site-redesign-02.png";
import personalSiteRedesignImage03 from "@/assets/images/shots/personal-site-redesign-03.png";
import personalSiteRedesignImage04 from "@/assets/images/shots/personal-site-redesign-04.png";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const images = [
  {
    src: personalSiteRedesignImage01,
    alt: "Personal site redesign iteration 1",
  },
  {
    src: personalSiteRedesignImage02,
    alt: "Personal site redesign iteration 2",
  },
  {
    src: personalSiteRedesignImage03,
    alt: "Personal site redesign iteration 3",
  },
  {
    src: personalSiteRedesignImage04,
    alt: "Personal site redesign iteration 4",
  },
];

export default function PersonalSiteGallery() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const showNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const showPreviousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {images.map((image, index) => (
        <Dialog
          key={image.alt}
          open={isDialogOpen && currentImageIndex === index}
          onOpenChange={setIsDialogOpen}
        >
          <DialogTrigger asChild>
            <button
              onClick={() => setCurrentImageIndex(index)}
              className="w-full"
            >
              <Image
                src={image.src}
                alt={image.alt}
                className="rounded-lg border border-white/10 transition hover:border-white/20"
              />
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-[90vw] border-white/10 bg-black/90 p-0 backdrop-blur-xl">
            <div className="relative flex items-center">
              <button
                onClick={showPreviousImage}
                className="absolute left-4 z-10 rounded-full bg-black/50 p-2 text-white/75 backdrop-blur-sm transition hover:bg-black/75 hover:text-white"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <Image
                src={images[currentImageIndex].src}
                alt={images[currentImageIndex].alt}
                className="h-auto w-full"
              />
              <button
                onClick={showNextImage}
                className="absolute right-4 z-10 rounded-full bg-black/50 p-2 text-white/75 backdrop-blur-sm transition hover:bg-black/75 hover:text-white"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
}
