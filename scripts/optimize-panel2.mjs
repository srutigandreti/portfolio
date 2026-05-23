import sharp from "sharp";

const ROOT = "C:\\Users\\sruti gandreti\\Desktop\\design portfolio\\";
const OUT_DIR = "public/images/showcase";

// 9 headshots — 900×1236 → 500×687 (still 2× display size on retina)
for (let i = 1; i <= 9; i++) {
  await sharp(`${ROOT}Profile Headshot ${i}.png`)
    .resize({ width: 500, withoutEnlargement: true })
    .png({ compressionLevel: 9, quality: 90, palette: false })
    .toFile(`${OUT_DIR}/headshot-${i}.png`);
}

// Mysa person card — 2368×3328 → 1200×1686 (good for retina at ~300px display)
await sharp(`${ROOT}mysa person card.png`)
  .resize({ width: 1200, withoutEnlargement: true })
  .png({ compressionLevel: 9, quality: 95, palette: false })
  .toFile(`${OUT_DIR}/mysa-person-card.png`);

// "Your match this week" text — 1648×236 → 1000×143 (keep crispness)
await sharp(`${ROOT}match this week text.png`)
  .resize({ width: 1000, withoutEnlargement: true })
  .png({ compressionLevel: 9, quality: 95, palette: false })
  .toFile(`${OUT_DIR}/match-this-week-text.png`);

console.log("panel 2 assets optimized");
