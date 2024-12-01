"use client";

import { createContext, useContext, useState } from "react";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image, { StaticImageData } from "next/image";

import { Dialog, DialogContent } from "@/components/ui/dialog";

export interface LightboxImage {
  src: StaticImageData | string;
  alt: string;
  id: string;
}

interface LightboxContextType {
  currentImage: LightboxImage | null;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  setCurrentImage: (image: LightboxImage | null) => void;
  showNext: () => void;
  showPrevious: () => void;
}

export const LightboxContext = createContext<LightboxContextType | null>(null);

export function useLightbox() {
  const context = useContext(LightboxContext);
  if (!context) {
    throw new Error("useLightbox must be used within a LightboxProvider");
  }
  return context;
}

export function LightboxProvider({
  children,
  images,
}: {
  children: React.ReactNode;
  images: LightboxImage[];
}) {
  const [currentImage, setCurrentImage] = useState<LightboxImage | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const currentIndex = currentImage
    ? images.findIndex((img) => img.id === currentImage.id)
    : -1;

  const showNext = () => {
    if (currentIndex === -1) return;
    const nextIndex = (currentIndex + 1) % images.length;
    setCurrentImage(images[nextIndex]);
  };

  const showPrevious = () => {
    if (currentIndex === -1) return;
    const previousIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentImage(images[previousIndex]);
  };

  return (
    <LightboxContext.Provider
      value={{
        currentImage,
        isOpen,
        setIsOpen,
        setCurrentImage,
        showNext,
        showPrevious,
      }}
    >
      {children}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-[90vw] border-white/10 bg-black/90 p-0 backdrop-blur-xl">
          {currentImage && (
            <div className="relative flex items-center">
              <button
                onClick={showPrevious}
                className="absolute left-4 z-10 rounded-full bg-black/50 p-2 text-white/75 backdrop-blur-sm transition hover:bg-black/75 hover:text-white"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <Image
                src={currentImage.src}
                alt={currentImage.alt}
                className="h-auto w-full"
              />
              <button
                onClick={showNext}
                className="absolute right-4 z-10 rounded-full bg-black/50 p-2 text-white/75 backdrop-blur-sm transition hover:bg-black/75 hover:text-white"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
              <div className="absolute bottom-4 left-0 right-0 text-center text-sm text-white/75">
                {currentImage.alt}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </LightboxContext.Provider>
  );
}
