/**
 * Change the image to grayscale.
 *
 * @param image         The imageData of a Canvas 2d context
 */
export const grayscale = (image: ImageData): void => {
  for (let i = 0; i < image.data.length; i += 4) {
    const luminance = (image.data[i] * 0.299) + (image.data[i + 1] * 0.587) +
      (image.data[i + 2] * 0.114);
    image.data.fill(luminance, i, i + 3);
  }
};

/**
 * Change the image to black and white using a simple threshold.
 * Pixels with a luminance darker than the threshold become black.
 *
 * @param image         The imageData of a Canvas 2d context
 * @param threshold     Threshold luminance for a pixel to be white (0-255)
 */
export const threshold = (image: ImageData, threshold: number): void => {
  for (let i = 0; i < image.data.length; i += 4) {
    const luminance = (image.data[i] * 0.299) + (image.data[i + 1] * 0.587) +
      (image.data[i + 2] * 0.114);

    const value = luminance < threshold ? 0 : 255;
    image.data.fill(value, i, i + 3);
  }
};

/**
 * Change the image to black and white using the Bayer algorithm.
 * Pixels with a luminance darker than the threshold become black.
 *
 * @param image         The imageData of a Canvas 2d context
 * @param threshold     Threshold luminance for a pixel to likely become white (0-255)
 */
export const bayer = (image: ImageData, threshold: number): void => {
  const thresholdMap = [
    [15, 135, 45, 165],
    [195, 75, 225, 105],
    [60, 180, 30, 150],
    [240, 120, 210, 90],
  ] as const;

  for (let i = 0; i < image.data.length; i += 4) {
    const luminance = (image.data[i] * 0.299) + (image.data[i + 1] * 0.587) +
      (image.data[i + 2] * 0.114);

    const x = i / 4 % image.width;
    const y = Math.floor(i / 4 / image.width);
    const map = Math.floor((luminance + thresholdMap[x % 4][y % 4]) / 2);
    const value = map < threshold ? 0 : 255;
    image.data.fill(value, i, i + 3);
  }
};

/**
 * Change the image to black and white using the Floyd-Steinberg algorithm.
 *
 * @param image         The imageData of a Canvas 2d context
 */
export const floydsteinberg = (image: ImageData): void => {
  const width = image.width;
  const luminance = new Uint8ClampedArray(image.width * image.height);

  for (let l = 0, i = 0; i < image.data.length; l++, i += 4) {
    luminance[l] = (image.data[i] * 0.299) + (image.data[i + 1] * 0.587) +
      (image.data[i + 2] * 0.114);
  }

  for (let l = 0, i = 0; i < image.data.length; l++, i += 4) {
    const value = luminance[l] < 129 ? 0 : 255;
    const error = Math.floor((luminance[l] - value) / 16);
    image.data.fill(value, i, i + 3);

    luminance[l + 1] += error * 7;
    luminance[l + width - 1] += error * 3;
    luminance[l + width] += error * 5;
    luminance[l + width + 1] += error * 1;
  }
};

/**
 * Change the image to black and white using the Atkinson algorithm.
 *
 * @param image         The imageData of a Canvas 2d context
 */
export const atkinson = (image: ImageData): void => {
  const width = image.width;
  const luminance = new Uint8ClampedArray(image.width * image.height);

  for (let l = 0, i = 0; i < image.data.length; l++, i += 4) {
    luminance[l] = (image.data[i] * 0.299) + (image.data[i + 1] * 0.587) +
      (image.data[i + 2] * 0.114);
  }

  for (let l = 0, i = 0; i < image.data.length; l++, i += 4) {
    const value = luminance[l] < 129 ? 0 : 255;
    const error = Math.floor((luminance[l] - value) / 8);
    image.data.fill(value, i, i + 3);

    luminance[l + 1] += error;
    luminance[l + 2] += error;
    luminance[l + width - 1] += error;
    luminance[l + width] += error;
    luminance[l + width + 1] += error;
    luminance[l + 2 * width] += error;
  }
};
