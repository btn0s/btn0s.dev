"use client";

import { useState } from "react";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image, { StaticImageData } from "next/image";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface ImageGalleryImage {
  src: StaticImageData | string;
  alt: string;
}

interface ImageGalleryProps {
  images: ImageGalleryImage[];
  className?: string;
}

export default function ImageGallery({ images, className }: ImageGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const showNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const showPreviousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className={`grid grid-cols-1 gap-4 md:grid-cols-2 ${className}`}>
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
