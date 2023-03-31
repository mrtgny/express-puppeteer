import { Response } from "express";
import { PDFOptions, ScreenshotOptions } from "puppeteer";
import { RedisClientType, createClient } from "redis";
import stream from "stream";
import { getBrowser } from "./constants";

export const isProd = () => process.env.NODE_ENV === "production";

export const getPDF = async (path: string, options: PDFOptions = {}) => {
  const pdfOptions: PDFOptions = {
    format: "a4",
    ...options,
  };
  console.log("getPDF: browser is launching");
  const browser = getBrowser();
  console.log("getPDF: browser is launched");
  const page = await browser.newPage();
  try {
    console.log("getPDF: New page is opened");
    console.log("getPDF: URL is opening", path);
    await page.goto(path, { waitUntil: "networkidle2" });
    console.log("getPDF: URL is opened", path);
    console.log("getPDF: Buffer is getting");
    const buffeer = await page.pdf(pdfOptions);
    console.log("getPDF: Buffer is got");
    console.log("getPDF: page is closing");
    await page.close();
    console.log("getPDF: page is closed");
    return buffeer;
  } catch (error) {
    page.close();
    throw Error(error as string);
  }
};

export const getImage: (
  path: string,
  options: ScreenshotOptions,
) => Promise<Buffer> = async (
  path: string,
  options: ScreenshotOptions = {},
) => {
  const _options: ScreenshotOptions = {
    fullPage: true,
    ...options,
  };
  _options.path = undefined;
  const browser = getBrowser();
  console.log("getImage: New page is opening", browser);
  const page = await browser.newPage();
  try {
    console.log("getImage: New page is opened", browser);
    console.log("getImage: URL is opening", path);
    await page.goto(path, {
      waitUntil: "networkidle2",
    });
    console.log("getImage: URL is opened", path);
    console.log("getImage: Buffer is getting");
    const buffeer = await page.screenshot(_options);
    console.log("getImage: Buffer is got");
    console.log("getImage: Page is closing");
    await page.close();
    console.log("getImage: Page is closed");
    return buffeer as Buffer;
  } catch (error) {
    page.close();
    throw Error(error as string);
  }
};

export const initLogger = () => {
  const oldLogger = console.log;
  console.log = (...args) => {
    const time = new Date().toLocaleString();
    oldLogger(time, ...args);
  };
};

let cacheClient: RedisClientType;
export const getCacheClient = () => cacheClient;
export const initRedis = async (url = "redis://redis-server:6379") => {
  if (cacheClient) return cacheClient;
  const client = createClient({
    url,
  });
  console.log("Initializing Redis client for", url);
  client.on("error", (err) => console.log("Redis Client Error", err));

  await client.connect();
  cacheClient = client as RedisClientType;
};

export const writeStream = (buffer: Buffer, response: Response) => {
  const readStream = new stream.PassThrough();
  readStream.end(buffer);
  readStream.pipe(response);
};
