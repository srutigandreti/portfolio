import sharp from "sharp";

const ROOT = "C:\\Users\\sruti gandreti\\Desktop\\design portfolio\\";
const OUT_DIR = "public/images/showcase";

const tasks = [
  ["50 plus photocards.png", "photocards-50plus.png", 1100],
  ["50 plus badge.png", "badge-50plus.png", 600],
  ["orb green bg.png", "orb-green-bg.png", 600],
  ["orb yellow fill.png", "orb-yellow-fill.png", 600],
  ["m icon.png", "m-icon.png", 300],
];

for (const [src, out, width] of tasks) {
  await sharp(ROOT + src)
    .resize({ width, withoutEnlargement: true })
    .png({ compressionLevel: 9, quality: 95, palette: false })
    .toFile(`${OUT_DIR}/${out}`);
  const meta = await sharp(`${OUT_DIR}/${out}`).metadata();
  console.log(`${out.padEnd(28)} ${meta.width}x${meta.height}`);
}
