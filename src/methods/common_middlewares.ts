import cacheMiddleware from "../middlewares/cache";
import { IAppRoute } from "../utils/types";

const commonMiddlewareRoutes: IAppRoute = {
  public(app) {
    app.get("*", cacheMiddleware);
  },
  private() {
    // For authenticated usage
  },
};

export default commonMiddlewareRoutes;
