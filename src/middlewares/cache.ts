import type { NextFunction, Request, Response } from "express";
import { getCache } from "../functions/cache";

const cacheMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const isOptionRequest = req.method === "OPTIONS";
  if (!isOptionRequest) {
    try {
      await getCache(req, res);
    } catch (error) {
      console.log("cache not found", req.url, error);
      next();
    }
  } else {
    next();
  }
};

export default cacheMiddleware;
