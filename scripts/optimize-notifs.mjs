import sharp from "sharp";
import { existsSync, mkdirSync } from "node:fs";

const ROOT = "C:\\Users\\sruti gandreti\\Desktop\\design portfolio\\";
const OUT_DIR = "public/images/showcase";
if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

// notification cards: native 2997×684 → resize to 1200w (still 2× target display size)
const notifs = [
  ["Notif 1.png", "notif-1.png"],
  ["Notif 2.png", "notif-2.png"],
  ["Notif 3.png", "notif-3.png"],
  ["Notif 4.png", "notif-4.png"],
  ["Notif 5.png", "notif-5.png"],
  ["Mysa Notif.png", "mysa-notif.png"],
];

for (const [src, out] of notifs) {
  await sharp(ROOT + src)
    .resize({ width: 1200, withoutEnlargement: true })
    .png({ compressionLevel: 9, quality: 95, palette: false })
    .toFile(`${OUT_DIR}/${out}`);
  const meta = await sharp(`${OUT_DIR}/${out}`).metadata();
  console.log(`${out.padEnd(20)} ${meta.width}x${meta.height}`);
}

// background: 900×1200 → keep at native (phone-screen size)
await sharp(ROOT + "notif background.png")
  .png({ compressionLevel: 9, quality: 95, palette: false })
  .toFile(`${OUT_DIR}/notif-bg.png`);
const bgMeta = await sharp(`${OUT_DIR}/notif-bg.png`).metadata();
console.log(`notif-bg.png         ${bgMeta.width}x${bgMeta.height}`);
