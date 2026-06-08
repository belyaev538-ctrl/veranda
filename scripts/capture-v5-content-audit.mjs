import { chromium } from "playwright";
import { mkdirSync } from "fs";
import { join } from "path";

const OUT = join(process.cwd(), "audit-screenshots", "content-audit");
const WIDTHS = [1440, 390];
const SECTIONS = [
  { id: "v5-crafted", name: "block03-crafted" },
  { id: "v5-premium-materials", name: "block04-premium-materials" },
  { id: "v5-outdoor-living", name: "block05-outdoor-living" },
  { id: "v5-detail", name: "block06-detail" },
  { id: "v5-made-sea", name: "block07-made-sea" },
  { id: "v5-custom", name: "block10-custom" },
  { id: "v5-viz", name: "block11-viz" },
  { id: "v5-collections", name: "block12-collections" },
  { id: "v5-materials", name: "block13-materials" },
  { id: "v5-nda", name: "block14-nda" },
  { id: "v5-why", name: "block15-why" },
  { id: "v5-faq", name: "block16-faq" },
  { id: "v5-contact", name: "block18-contact" },
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
  const height = width <= 768 ? 844 : 900;
  await page.setViewportSize({ width, height });
  await page.goto("http://localhost:3000/v5", { waitUntil: "domcontentloaded" });
  await page.waitForSelector("#v5-hero", { timeout: 60000 });
  await page.waitForTimeout(1500);

  for (const { id, name } of SECTIONS) {
    const el = page.locator(`#${id}`);
    if ((await el.count()) === 0) {
      console.warn(`Missing #${id}`);
      continue;
    }
    await el.evaluate((node) => {
      const rect = node.getBoundingClientRect();
      const offset = Math.min(Math.max(rect.height * 0.08, 0), 120);
      window.scrollTo({
        top: window.scrollY + rect.top - offset,
        behavior: "instant",
      });
    });
    await page.waitForTimeout(800);

    await page.screenshot({
      path: join(OUT, `${name}-${width}px.png`),
      fullPage: false,
    });
  }
}

await browser.close();
console.log(`Screenshots saved to ${OUT}`);
