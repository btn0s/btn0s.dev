"use client";

import { type LightboxImage, useLightbox } from "./lightbox-provider";

interface LightboxTriggerProps {
  image: LightboxImage;
  children: React.ReactNode;
}

export default function LightboxTrigger({
  image,
  children,
}: LightboxTriggerProps) {
  const { setCurrentImage, setIsOpen } = useLightbox();

  const handleClick = () => {
    setCurrentImage(image);
    setIsOpen(true);
  };

  return (
    <button onClick={handleClick} className="w-full">
      {children}
    </button>
  );
}
