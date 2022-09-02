import { PDFOptions, ScreenshotOptions } from "puppeteer";
import { getBrowser } from "./constants";

export const getPDF = async (path: string, options: PDFOptions = {}) => {
    const PDFOptions: PDFOptions = {
        format: "a4",
        ...options
    }
    console.log("getPDF: browser is launching")
    const browser = getBrowser()
    console.log("getPDF: browser is launched")
    const page = await browser.newPage();
    console.log("getPDF: New page is opened")
    console.log("getPDF: URL is opening", path);
    await page.goto(path, { waitUntil: 'networkidle2', });
    console.log("getPDF: URL is opened", path);
    console.log("getPDF: Buffer is getting");
    const buffeer = await page.pdf(PDFOptions);
    console.log("getPDF: Buffer is got");
    console.log("getPDF: page is closing");
    await page.close();
    console.log("getPDF: page is closed");
    return buffeer;
}

export const getImage = async (path: string, options: ScreenshotOptions = {}) => {
    const _options: ScreenshotOptions = {
        fullPage: true,
        ...options
    }
    _options.path = undefined;
    const browser = getBrowser();
    console.log("getImage: New page is opening", browser);
    const page = await browser.newPage();
    console.log("getImage: New page is opened", browser);
    console.log("getImage: URL is opening", path);
    await page.goto(path, {
        waitUntil: 'networkidle2',
    });
    console.log("getImage: URL is opened", path);
    console.log("getImage: Buffer is getting");
    const buffeer = await page.screenshot(_options);
    console.log("getImage: Buffer is got");
    console.log("getImage: Page is closing");
    await page.close();
    console.log("getImage: Page is closed");
    return buffeer;
}