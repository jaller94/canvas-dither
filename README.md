# canvas-dither

Black and White dithering for the canvas element

## Differences of this fork

This is a fork of [NielsLeenheer/CanvasDither](https://github.com/NielsLeenheer/CanvasDither) which is published on NPM as [canvas-dither](https://www.npmjs.com/package/canvas-dither).

* Exports individual functions instead of a class object to allow for tree shaking.
* No longer returns the ImageData, because the input parameter is mutated. Returning the same object gave me the false assumption that the unctions had created a copy.
* Developed in TypeScript instead of JavaScript
* Published on JSR.io instead of npm
* Developed using Deno instead of NodeJs
* Changed the default branch from "master" to "main"

## Usage

First, install the package using npm:

    npx jsr add @jaller94/canvas-dither

For other package managers, read the instructions on https://jsr.io/@jaller94/canvas-dither.

Then, require the package and use it like so:

    import * as Dither from "@jaller94/canvas-dither";

    // Assume we have an existing canvas element with a 2D context
    // Retrieve the image data of the canvas
    let image = context.getImageData(0, 0, canvas.width, canvas.height);

    // Dither the data using the Atkinson algoritm
    Dither.atkinson(image);

    // Place the image data back on the canvas
    context.putImageData(image, 0, 0);

This package contains the following algorithms:

### Threshold
A simple threshold which will make all pixels with a luminance over the threshold white and under the threshold black. 

    Dither.threshold(imageData, threshold);

### Bayer
Using a Bayer matrix the image is converted to black and white with a cross-hatch pattern. 
    
    Dither.bayer(imageData, threshold);

### Floyd-Steinberg
Altough there is nothing random about this algorithm, the results looks like a random scattering of dots, making especially photos seem very natural.

    Dither.floydsteinberg(imageData);

### Bill Atkinson
An improved version of the Floyd-Steinberg algorithm created by Bill Atkinson of MacPaint fame. This algorithm creates less noise in almost white backgrounds compared to Floyd-Steinberg, but has more contrast as a result.

    Dither.atkinson(imageData);


## License

MIT
