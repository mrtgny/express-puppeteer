import cors from "cors";
import express from "express";
import morgan from "morgan";
import { initRoutes } from "./routes";

const PORT = 4000;
const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"))

initRoutes(app);
app.listen(PORT)

console.log(
    `🚀 Query endpoint ready at http://localhost:${PORT}`
);