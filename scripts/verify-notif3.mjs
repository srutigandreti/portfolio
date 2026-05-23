import sharp from "sharp";
import { readFileSync } from "node:fs";

const buf = readFileSync("C:\\Users\\sruti gandreti\\Desktop\\design portfolio\\verify-3-1080.avif");
await sharp(buf).png().toFile("C:\\Users\\sruti gandreti\\Desktop\\design portfolio\\verify-3-1080.png");
console.log("converted");
