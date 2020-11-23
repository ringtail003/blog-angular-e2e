import { Browser } from "puppeteer-core";

export const browser = {
  baseUrl: "http://localhost:4201/",
  launch: async (): Promise<Browser> => {
    const puppeteer = require("puppeteer-core");

    const instance: Browser = await puppeteer.launch({
      headless: false,
      slowMo: 50,
      devtools: false,
      executablePath:
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    });

    return instance;
  },
};
