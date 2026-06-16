import sharp from "sharp";
import { readdir, readFile, writeFile } from "fs/promises";
import { join, extname } from "path";

const DIR = join(process.cwd(), "public/playground");

const files = await readdir(DIR);
for (const f of files) {
  const ext = extname(f).toLowerCase();
  if (ext !== ".jpg" && ext !== ".jpeg") continue;
  const p = join(DIR, f);
  const src = await readFile(p);
  const buf = await sharp(src).rotate(90).jpeg({ quality: 82, mozjpeg: true }).toBuffer();
  await writeFile(p, buf);
  console.log(`rotated  ${f}`);
}
console.log("Done.");
