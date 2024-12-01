import { FC } from "react";

import Image, { ImageProps } from "next/image";

const ImageWithCaption: FC<ImageProps> = ({ className, alt, ...props }) => {
  return (
    <div className={className}>
      <Image {...props} alt={alt} className="mb-2 rounded-lg" />
      <div className="w-full text-center text-xs text-muted-foreground">
        {alt}
      </div>
    </div>
  );
};

export default ImageWithCaption;
