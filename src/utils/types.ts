import type { Express } from "express";

export declare type ImageType = "png" | "jpeg" | "webp";
export interface IAppRoute {
  public: (app: Express) => void;
  private: (app: Express) => void;
}
