import { getPDFRoute } from "../functions/pdf";
import { IAppRoute } from "../utils/types";

const pdfRoutes: IAppRoute = {
    public(app) {
        app.get("/pdf", getPDFRoute);
    },
    private(app) {

    },
}

export default pdfRoutes