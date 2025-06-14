import { Request, Response } from "express";
import { PDFOptions, PaperFormat } from "puppeteer";
import { getPDF, writeStream } from "../utils/functions";
import { setCache } from "./cache";

export const getPDFRoute = async (req: Request, res: Response) => {
  console.log("request is came");

  try {
    const reqUrl = req.query.url as string;
    const url = reqUrl.indexOf("http") === 0 ? reqUrl : `http://${reqUrl}`;
    const download = (req.query.download as string) === "true";
    const displayHeaderFooter =
      (req.query.displayHeaderFooter as string) === "true";
    const footerTemplate = req.query.footerTemplate as string;
    const format: PaperFormat = req.query.format as PaperFormat;
    const headerTemplate = req.query.headerTemplate as string;
    const height = req.query.height as string;
    const width = req.query.width as string;
    const scaleValue = parseFloat(req.query.scale as string);
    const scale = isNaN(scaleValue) ? undefined : scaleValue;
    const preferCSSPageSize =
      (req.query.preferCSSPageSize as string) === "true";
    const pageRanges = req.query.pageRanges as string;
    const landscape = (req.query.landscape as string) === "true";
    const omitBackground = (req.query.omitBackground as string) === "true";
    const printBackground = (req.query.printBackground as string) === "true";
    const fileName = (req.query.fileName as string) || `${url}.pdf`;

    const options: PDFOptions = {
      displayHeaderFooter,
      footerTemplate,
      format,
      headerTemplate,
      height,
      width,
      scale,
      preferCSSPageSize,
      pageRanges,
      landscape,
      omitBackground,
      printBackground,
    };

    console.log("GETTING PDF");
    const fileContents = await getPDF(url, options);
    console.log("GOT PDF");
    if (download)
      res.set("Content-disposition", `attachment; filename=${fileName}`);
    res.set("Content-Type", "application/pdf");
    writeStream(fileContents as Buffer, res);
    setCache(req, fileContents as Buffer);
  } catch (_error) {
    const error = _error as Error;
    console.log("error", error);
    res.status(400).send({
      error,
      message: error.message,
    });
  }
};
