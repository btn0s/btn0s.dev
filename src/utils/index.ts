/**
 * Computes the average brightness of an image based on its source URL.
 * The function samples every 10th pixel for performance, so the result is an approximation.
 * The brightness is a value between 1 (white) and 0 (black).
 *
 * @param imageSrc - The source URL of the image.
 * @returns Promise that resolves with the average brightness of the image, where 1 is white and 0 is black.
 */
export function getImageLightness(imageSrc: string): Promise<number> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = imageSrc;

    img.onload = function () {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Failed to get canvas 2D context"));
        return;
      }

      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const { data } = imageData;

      let colorSum = 0;

      // Sample every 10th pixel for performance (can adjust for accuracy)
      for (let x = 0, len = data.length; x < len; x += 40) {
        const r = data[x];
        const g = data[x + 1];
        const b = data[x + 2];

        // if r g or b are undefined, it means we're at the end of our array so we can just break out of the loop
        if (r === undefined || g === undefined || b === undefined) {
          break;
        }

        const avg = (r + g + b) / 3;
        colorSum += avg;
      }

      const brightness = Math.floor(colorSum / ((img.width * img.height) / 10));

      // Normalize and invert the brightness to be between 0 (black) and 1 (white)
      const normalizedBrightness = 1 - brightness / 255;

      resolve(normalizedBrightness);
    };

    img.onerror = function () {
      reject(new Error("Failed to load the image"));
    };
  });
}
