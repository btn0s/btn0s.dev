import Image, { ImageProps } from "next/image";

import { type LightboxImage } from "./lightbox-provider";
import LightboxTrigger from "./lightbox-trigger";

interface LightboxImageProps extends Omit<ImageProps, "src" | "alt"> {
  src: LightboxImage["src"];
  alt: string;
  id?: string;
}

export default function LightboxImage({
  src,
  alt,
  id,
  className,
  ...props
}: LightboxImageProps) {
  const image: LightboxImage = {
    src,
    alt,
    id: id || `${src.toString()}-${alt}`,
  };

  return (
    <div className={className}>
      <LightboxTrigger image={image}>
        <Image {...props} src={src} alt={alt} className="mb-2 rounded-lg" />
      </LightboxTrigger>
      <div className="w-full text-center text-xs text-muted-foreground">
        {alt}
      </div>
    </div>
  );
}
