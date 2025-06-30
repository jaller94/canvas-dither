import { assertEquals } from "@std/assert";
import { atkinson, bayer, floydsteinberg, grayscale, threshold } from "./main.ts";

Deno.test('atkinson: #f00 becomes #000', () => {
  const img = new ImageData(1, 1);
  img.data[0] = 255;
  atkinson(img);
  assertEquals(img.data[0], 0);
  assertEquals(img.data[1], 0);
  assertEquals(img.data[2], 0);
});

Deno.test('bayer: #f00 with threshold = 40 becomes #fff', () => {
  const img = new ImageData(1, 1);
  img.data[0] = 255;
  bayer(img, 40);
  assertEquals(img.data[0], 255);
  assertEquals(img.data[1], 255);
  assertEquals(img.data[2], 255);
});

Deno.test('bayer: #f00 with threshold = 77 becomes #000', () => {
  const img = new ImageData(1, 1);
  img.data[0] = 255;
  bayer(img, 77);
  assertEquals(img.data[0], 0);
  assertEquals(img.data[1], 0);
  assertEquals(img.data[2], 0);
});

Deno.test('floydsteinberg: #f00 becomes #fff', () => {
  const img = new ImageData(1, 1);
  img.data[0] = 255;
  floydsteinberg(img);
  assertEquals(img.data[0], 0);
  assertEquals(img.data[1], 0);
  assertEquals(img.data[2], 0);
});

Deno.test('grayscale: #f00 becomes #4c4c4c', () => {
  const img = new ImageData(1, 1);
  img.data[0] = 255;
  grayscale(img);
  assertEquals(img.data[0], 76);
  assertEquals(img.data[1], 76);
  assertEquals(img.data[2], 76);
});

Deno.test('threshold: #f00 with threshold = 76 becomes #fff', () => {
  const img = new ImageData(1, 1);
  img.data[0] = 255;
  threshold(img, 76);
  assertEquals(img.data[0], 255);
  assertEquals(img.data[1], 255);
  assertEquals(img.data[2], 255);
});

Deno.test('threshold: #f00 with threshold = 77 becomes #000', () => {
  const img = new ImageData(1, 1);
  img.data[0] = 255;
  threshold(img, 77);
  assertEquals(img.data[0], 0);
  assertEquals(img.data[1], 0);
  assertEquals(img.data[2], 0);
});

Deno.test('No function changes the alpha channel', () => {
  const img = new ImageData(1, 1);
  img.data[3] = 133;
  atkinson(img);
  bayer(img, 0);
  floydsteinberg(img);
  grayscale(img);
  threshold(img, 0);
  assertEquals(img.data[3], 133);
});
