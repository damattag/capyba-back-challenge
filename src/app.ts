import express, { Express } from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import cookieParser from "cookie-parser";

import { errorHandler } from "./middlewares";
import swaggerDocument from "./docs";
import routes from "./routes";

const app: Express = express();

app.use(express.json());
app.use(cors({ origin: "*" })); // put your front-end url in place of "*" to restrict access
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(routes);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(errorHandler);

export default app;
