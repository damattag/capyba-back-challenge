import express, { Express } from "express";
import { errorHandler } from "./middlewares";

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(errorHandler);

export default app;
