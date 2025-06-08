import { Browser, launch } from "puppeteer";

let browser: Browser;

export const getBrowser = async () =>
  await launch({
    headless: true,
    devtools: true,
    args: [
      "--disable-web-security",
      "--disable-features=IsolateOrigins",
      "--disable-site-isolation-trials",
    ],
  });
