import { Page } from "puppeteer-core";

export async function screenshot(page: Page, fileName: string): Promise<string[]> {
  await page.screenshot({
    path: `${__dirname}/../capture/${fileName}.png`,
    fullPage: true,
  });

  return Promise.resolve([]);
}
