import { PNGImage, RGB } from "https://deno.land/x/dpng@0.7.5/mod.ts";
import * as font from "./font.ts";

interface Position {
  x: number;
  y: number;
}

export function colorToRGB(data: number): RGB {
  const r = (data & 0xff0000) >> 16;
  const g = (data & 0x00ff00) >> 8;
  const b = data & 0x0000ff;
  return { r, g, b, a: 1 };
}

export function drawCharacter(
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

export function drawNumber(image: PNGImage, offset: Position, n: number) {
  const number_string = String(n).padStart(10, "0");
  for (let i = 0; i < number_string.length; i++) {
    const character = Number(number_string[i]);
    drawCharacter(image, font.numbers[character], {
      x: offset.x + (font.width + 1) * i,
      y: offset.y,
    });
  }
}

export function drawImage(total: number, unique: number) {
  const image = new PNGImage(78, 16, 24, { r: 255, g: 255, b: 255, a: 1 });
  drawCharacter(image, font.letters.t, { x: 1 + 6 * 0, y: 1 });
  drawNumber(image, { x: 18, y: 1 }, total);
  drawCharacter(image, font.letters.u, { x: 1 + 6 * 0, y: 10 });
  drawNumber(image, { x: 18, y: 10 }, unique);
  return image.getBuffer();
}
