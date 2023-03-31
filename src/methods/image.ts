import { getImageRoute } from "../functions/image";
import { IAppRoute } from "../utils/types";

const imageRoutes: IAppRoute = {
  public(app) {
    app.get("/image", getImageRoute);
  },
  private() {
    // For authenticated usage
  },
};

export default imageRoutes;
