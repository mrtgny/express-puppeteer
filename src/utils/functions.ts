import puppeteer, { PDFOptions, ScreenshotOptions } from "puppeteer";

export const getPDF = async (path: string, options: PDFOptions = {}) => {
    const PDFOptions: PDFOptions = {
        format: "a4",
        ...options
    }
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(path, { waitUntil: 'networkidle2', });
    const buffeer = await page.pdf(PDFOptions);
    await browser.close();
    return buffeer;
}

export const getImage = async (path: string, options: ScreenshotOptions = {}) => {
    const _options: ScreenshotOptions = {
        fullPage: true,
        ...options
    }
    _options.path = undefined;

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(path, {
        waitUntil: 'networkidle2',
    });
    const buffeer = await page.screenshot(_options);
    await browser.close();
    return buffeer;
}