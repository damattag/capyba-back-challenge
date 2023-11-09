import express, { Express } from "express";
import { errorHandler } from "./middlewares";
import router from "./routes";

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.use(errorHandler);

export default app;
