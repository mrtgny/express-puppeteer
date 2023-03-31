import { Browser } from "puppeteer";

let browser: Browser;

export const getBrowser = () => browser;
export const setBrowser: (browser: Browser) => Browser = (_browser) => {
  browser = _browser;
  return browser;
};
