import { test, expect } from "@playwright/test";

test("Pulse page visual match", async ({ page }) => {
  await page.goto("/pulse");
  await page.waitForTimeout(2000); // allow animations + data load
  expect(await page.screenshot()).toMatchSnapshot("pulse.png");
});
