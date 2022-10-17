import cors from "cors";
import express from "express";
import morgan from "morgan";
import { initRoutes } from "./routes";
import { initLogger, initRedis } from "./utils/functions";

const PORT = 4000;
const app = express();

initLogger();
initRedis();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"))

export const initServer = async () => {
    await initRoutes(app);
    app.listen(PORT)
    console.log(
        `🚀 Query endpoint ready at http://localhost:${PORT}`
    );
}