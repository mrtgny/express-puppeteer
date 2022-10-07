import { Request, Response } from "express";
import { ScreenshotClip, ScreenshotOptions } from "puppeteer";
import stream from "stream";
import { getImage } from "../utils/functions";
import { ImageType } from "../utils/types";

export const getImageRoute = async (req: Request, res: Response) => {
    try {

        const reqUrl = req.query.url as string;
        const url = reqUrl.indexOf("http") === 0 ? reqUrl : `http://${reqUrl}`;
        const type: ImageType = (req.query.type as ImageType) || "jpeg";

        const qualityValue = parseFloat(req.query.quality as string);
        const quality = type !== "jpeg" ? undefined : !isNaN(qualityValue) ? qualityValue : 100;

        const omitBackground = (req.query.omitBackground as string) === "true";
        const fullPage = !req.query.fullPage || (req.query.fullPage as string) === "true";
        const download = (req.query.download as string) === "true";
        const fileName = (req.query.fileName as string) || `${url}.${type}`;

        const x = parseFloat(req.query.x as string);
        const y = parseFloat(req.query.y as string);
        const width = parseFloat(req.query.width as string);
        const height = parseFloat(req.query.height as string);
        const sendClip = !isNaN(x) && !isNaN(y) && !isNaN(width) && !isNaN(height);
        const clip: ScreenshotClip = { x, y, width, height }
        const options: ScreenshotOptions = { omitBackground, type, fullPage, quality }
        if (sendClip) options.clip = clip;

        console.log("GETTING IMAGE")
        const fileContents = await getImage(url, options);
        console.log("GOT IMAGE")

        var readStream = new stream.PassThrough();
        readStream.end(fileContents);

        if (download)
            res.set('Content-disposition', `attachment; filename=${fileName}`);
        res.set('Content-Type', `image/${type}`);

        readStream.pipe(res);
    } catch (error) {
        console.log("error", error);
        res.status(400).send({
            error,
            message: error.message
        })
    }
}