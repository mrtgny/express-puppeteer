import { Express } from 'express';
import pdfRoutes from '../methods/getPdf';

export const initRoutes = (app: Express) => {
    pdfRoutes.public(app);
}