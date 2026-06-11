/**
 * Конвертирует PNG/JPEG в public/images → WebP (max 1920px, quality 84).
 * Исходники удаляются, если WebP меньше.
 */
import sharp from "sharp";
import { readdirSync, statSync, unlinkSync } from "fs";
import { join, extname, basename } from "path";

const IMAGES_DIR = "public/images";
const MAX_WIDTH = 1920;
const WEBP_QUALITY = 84;

const INPUT_EXT = new Set([".png", ".jpg", ".jpeg"]);

async function optimizeFile(filePath) {
  const ext = extname(filePath).toLowerCase();
  if (!INPUT_EXT.has(ext)) return null;

  const outPath = filePath.replace(/\.(png|jpe?g)$/i, ".webp");
  const inputSize = statSync(filePath).size;

  const pipeline = sharp(filePath).rotate();
  const meta = await pipeline.metadata();

  let img = sharp(filePath).rotate();
  if (meta.width && meta.width > MAX_WIDTH) {
    img = img.resize({ width: MAX_WIDTH, withoutEnlargement: true });
  }

  await img
    .webp({ quality: WEBP_QUALITY, effort: 4 })
    .toFile(outPath);

  const outputSize = statSync(outPath).size;
  const saved = inputSize - outputSize;
  const pct = Math.round((1 - outputSize / inputSize) * 100);

  if (outputSize < inputSize) {
    unlinkSync(filePath);
  } else {
    unlinkSync(outPath);
    return { file: basename(filePath), skipped: true, reason: "webp larger" };
  }

  return {
    file: basename(filePath),
    from: Math.round(inputSize / 1024),
    to: Math.round(outputSize / 1024),
    savedKb: Math.round(saved / 1024),
    pct,
    dims: `${meta.width}x${meta.height}`,
  };
}

async function main() {
  const entries = readdirSync(IMAGES_DIR, { withFileTypes: true });
  const files = entries
    .filter((e) => e.isFile())
    .map((e) => join(IMAGES_DIR, e.name));

  let totalBefore = 0;
  let totalAfter = 0;
  const results = [];

  for (const file of files) {
    const result = await optimizeFile(file);
    if (result && !result.skipped) {
      results.push(result);
      totalBefore += result.from;
      totalAfter += result.to;
    } else if (result?.skipped) {
      console.log(`  skip ${result.file}: ${result.reason}`);
    }
  }

  console.log("\nOptimized", results.length, "files");
  console.log(
    `Total: ${totalBefore} KB → ${totalAfter} KB (−${totalBefore - totalAfter} KB, −${Math.round((1 - totalAfter / totalBefore) * 100)}%)`
  );
  for (const r of results) {
    console.log(
      `  ${r.file}: ${r.dims} ${r.from}KB → ${r.to}KB (−${r.pct}%)`
    );
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
