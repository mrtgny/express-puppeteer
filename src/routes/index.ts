import { Express } from "express";
import { launch } from "puppeteer";
import commonMiddlewareRoutes from "../methods/common_middlewares";
import imageRoutes from "../methods/image";
import pdfRoutes from "../methods/pdf";
import { setBrowser } from "../utils/constants";

export const initRoutes = async (app: Express) => {
  const browser = await launch();
  console.log("browser is launched");
  setBrowser(browser);
  commonMiddlewareRoutes.public(app);
  pdfRoutes.public(app);
  imageRoutes.public(app);
  commonMiddlewareRoutes.private(app);
  pdfRoutes.private(app);
  imageRoutes.private(app);
};
