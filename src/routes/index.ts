import { Express } from 'express';
import { launch } from 'puppeteer';
import pdfRoutes from '../methods/getPdf';
import { setBrowser } from '../utils/constants';

export const initRoutes = async (app: Express) => {
    const browser = await launch();
    console.log('browser is launched');
    setBrowser(browser);
    pdfRoutes.public(app);
}