import sharp from "sharp";
import { existsSync } from "node:fs";

const SRC = "C:\\Users\\sruti gandreti\\Desktop\\design portfolio\\Mysa Banner.png";
const OUT = "public/images/mysa-banner-v4.png";

if (!existsSync(SRC)) {
  console.error("source not found:", SRC);
  process.exit(1);
}

const meta = await sharp(SRC).metadata();
console.log("source:", meta.width + "x" + meta.height);

await sharp(SRC)
  .resize({ width: 3840, withoutEnlargement: true })
  .png({ compressionLevel: 9, quality: 100, palette: false })
  .toFile(OUT);

const outMeta = await sharp(OUT).metadata();
console.log("output:", outMeta.width + "x" + outMeta.height);
