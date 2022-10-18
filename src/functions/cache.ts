import { Request, Response } from "express";
import md5 from "md5";
import { getCacheClient, writeStream } from "../utils/functions";

const getCacheKey = (request: Request) => {
    const { url, query, body, headers } = request;
    const stringToHash = `${url}_${JSON.stringify(query)}_${JSON.stringify(body)}_${JSON.stringify(headers)}`;
    const hashKey = md5(stringToHash);
    return hashKey
}

export const setCache = async (request: Request, content: Buffer | string) => {
    const { url, query, body, headers } = request;
    const hashKey = getCacheKey(request);
    const cacheClient = getCacheClient();
    if (!cacheClient) return;
    await cacheClient.set(hashKey, content.toString("hex"), {
        EX: 60 * 60 * 24 * 3
    });
}

export const getCache = async (request: Request, response: Response) => {
    const { url, query } = request;
    if (query.cache === "false") throw Error("No cache query is found in the url");
    const hashKey = getCacheKey(request);
    const cacheClient = getCacheClient();
    if (!cacheClient) return;
    const buffer = await cacheClient.get(hashKey);
    if (!buffer) {
        throw Error(`hashkey ${hashKey} for url ${url} cache not found ${buffer}`)
    }
    writeStream(Buffer.from(buffer, "hex"), response)
    console.log("Cache found in redis for url", url)
    return response;
}