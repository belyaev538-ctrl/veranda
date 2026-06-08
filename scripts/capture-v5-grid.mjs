import { chromium } from "playwright";
import { mkdirSync } from "fs";
import { join } from "path";

const OUT = join(process.cwd(), "audit-screenshots", "wave1-after");
const WIDTHS = [1440, 1920, 1280, 1024, 768, 390];
const SECTIONS = [
  { id: "v5-statement", name: "statement" },
  { id: "v5-production", name: "production" },
  { id: "v5-collections", name: "collections" },
  { id: "v5-why", name: "why" },
  { id: "v5-faq", name: "faq" },
  { id: "v5-contact", name: "contact" },
];

mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
});

await context.addInitScript(() => {
  localStorage.setItem("verandaru-yacht-intro-v5-seen", "1");
});

const page = await context.newPage();

for (const width of WIDTHS) {
  await page.setViewportSize({ width, height: width <= 768 ? 1200 : 900 });
  await page.goto("http://localhost:3000/v5", { waitUntil: "domcontentloaded" });
  await page.waitForSelector("#v5-hero", { timeout: 60000 });
  await page.waitForTimeout(1200);

  await page.screenshot({
    path: join(OUT, `full-${width}px.png`),
    fullPage: false,
  });

  for (const { id, name } of SECTIONS) {
    const el = page.locator(`#${id}`);
    if ((await el.count()) === 0) continue;
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await el.screenshot({
      path: join(OUT, `${name}-${width}px.png`),
    });
  }
}

await browser.close();
console.log(`Screenshots saved to ${OUT}`);
