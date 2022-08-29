import { getImageRoute } from "../functions/getImage";
import { getPDFRoute } from "../functions/getPdf";
import { IAppRoute } from "../utils/types";

const pdfRoutes: IAppRoute = {
    public(app) {
        app.post("/pdf", getPDFRoute);
        app.post("/image", getImageRoute);
    },
    private(app) {

    },
}

export default pdfRoutes