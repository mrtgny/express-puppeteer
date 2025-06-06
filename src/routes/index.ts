import { Express } from "express";
import { launch } from "puppeteer";
import commonMiddlewareRoutes from "../methods/common_middlewares";
import imageRoutes from "../methods/image";
import pdfRoutes from "../methods/pdf";
import { setBrowser } from "../utils/constants";

export const initRoutes = async (app: Express) => {
  const browser = await launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
      "--single-process",
      "--no-zygote",
      "--disable-background-timer-throttling",
      "--disable-backgrounding-occluded-windows",
      "--disable-renderer-backgrounding",
    ],
  });
  console.log("browser is launched");
  setBrowser(browser);
  commonMiddlewareRoutes.public(app);
  pdfRoutes.public(app);
  imageRoutes.public(app);
  commonMiddlewareRoutes.private(app);
  pdfRoutes.private(app);
  imageRoutes.private(app);
};
