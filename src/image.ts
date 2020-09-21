import { PNGImage, RGB } from "https://deno.land/x/dpng@0.7.5/mod.ts";
import * as font from "./font.ts";

export function createImage(total: number, unique: number) {
  const image = new PNGImage(78, 31, 24, { r: 255, g: 255, b: 255, a: 1 });
  const red = image.createRGBColor({ r: 255, g: 0, b: 0, a: 1 });
  writeCharacter(image, font.letters.t,  { x: 1  + 6 * 0, y: 1 });
  writeCharacter(image, font.numbers[0], { x: 12 + 6 * 1, y: 1 });
  writeCharacter(image, font.numbers[1], { x: 12 + 6 * 2, y: 1 });
  writeCharacter(image, font.numbers[2], { x: 12 + 6 * 3, y: 1 });
  writeCharacter(image, font.numbers[3], { x: 12 + 6 * 4, y: 1 });
  writeCharacter(image, font.numbers[4], { x: 12 + 6 * 5, y: 1 });
  writeCharacter(image, font.numbers[5], { x: 12 + 6 * 6, y: 1 });
  writeCharacter(image, font.numbers[6], { x: 12 + 6 * 7, y: 1 });
  writeCharacter(image, font.numbers[7], { x: 12 + 6 * 8, y: 1 });
  writeCharacter(image, font.numbers[8], { x: 12 + 6 * 9, y: 1 });
  writeCharacter(image, font.numbers[9], { x: 12 + 6 * 10, y: 1 });
  image.setPixel(4, 4, red);
  const base64 = image.getBuffer();
  return base64;
}

export function colorToRGB(data: number): RGB {
  const r = (data & 0xff0000) >> 16;
  const g = (data & 0x00ff00) >> 8;
  const b = data & 0x0000ff;
  return { r, g, b, a: 1 };
}

export function writeCharacter(
  image: PNGImage,
  data: number[],
  offset: {
    x: number;
    y: number;
  }
) {
  for (let x = 0; x < font.width; x++) {
    for (let y = 0; y < font.height; y++) {
      const color = data[x + y * font.width];
      const rgb = image.createRGBColor(colorToRGB(color));
      image.setPixel(x + offset.x, y + offset.y, rgb);
    }
  }
}
