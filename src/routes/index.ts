import { Express } from "express";
import commonMiddlewareRoutes from "../methods/common_middlewares";
import imageRoutes from "../methods/image";
import pdfRoutes from "../methods/pdf";

export const initRoutes = async (app: Express) => {
  commonMiddlewareRoutes.public(app);
  pdfRoutes.public(app);
  imageRoutes.public(app);
  commonMiddlewareRoutes.private(app);
  pdfRoutes.private(app);
  imageRoutes.private(app);
};
