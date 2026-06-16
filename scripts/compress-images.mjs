import sharp from "sharp";
import { readdir, stat, writeFile, readFile } from "fs/promises";
import { join, extname } from "path";

const ROOT = process.cwd();

const TARGETS = [
  { dir: join(ROOT, "public/playground"), exts: [".jpg", ".jpeg", ".png"] },
];

// Skip files that are clearly icons/logos that need lossless quality
const SKIP = new Set([
  "badge.png",
  "tape.jpg",
]);

async function compress(filePath) {
  const ext = extname(filePath).toLowerCase();
  const name = filePath.split(/[\\/]/).pop();
  if (SKIP.has(name)) {
    console.log(`  skip  ${name}`);
    return;
  }

  const before = (await stat(filePath)).size;
  // Read into memory first so sharp releases the file handle before we write back
  const srcBuf = await readFile(filePath);
  const img = sharp(srcBuf);
  await img.metadata(); // validate it's a real image

  let pipeline = sharp(srcBuf);
  if (ext === ".jpg" || ext === ".jpeg") {
    pipeline = pipeline.jpeg({ quality: 82, mozjpeg: true });
  } else if (ext === ".png") {
    pipeline = pipeline.png({ quality: 85, compressionLevel: 9 });
  } else {
    return;
  }

  const buf = await pipeline.toBuffer();
  const after = buf.length;

  if (after < before) {
    await writeFile(filePath, buf);
    const saved = ((before - after) / before * 100).toFixed(1);
    console.log(`  ✓  ${name}  ${(before/1e6).toFixed(2)}MB → ${(after/1e6).toFixed(2)}MB  (-${saved}%)`);
  } else {
    console.log(`  ~  ${name}  already optimal`);
  }
}

for (const { dir, exts } of TARGETS) {
  console.log(`\n📁 ${dir}`);
  const files = await readdir(dir);
  for (const f of files) {
    if (exts.includes(extname(f).toLowerCase())) {
      await compress(join(dir, f));
    }
  }
}

console.log("\nDone.");
