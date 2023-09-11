import { useEffect, useState } from 'react';

import { getImageLightness } from '@/utils';

/**
 * Custom hook to get the lightness of an image.
 * It runs only on the client side and utilizes the `getImageLightness` function.
 *
 * @param imageSrc - The source URL of the image.
 * @returns A number indicating the average lightness of the image (from 0 for black to 1 for white).
 */
function useImageLightness(imageSrc: string): number | null {
  const [brightness, setBrightness] = useState<number | null>(null);

  useEffect(() => {
    getImageLightness(imageSrc)
      .then((brightnessValue) => {
        setBrightness(brightnessValue);
      })
      .catch((error) => {
        console.error(`Error fetching brightness: ${error.message}`);
      });
  }, [imageSrc]);

  return brightness;
}

export default useImageLightness;
