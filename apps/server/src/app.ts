import express from "express";
import { errorHandler } from "./infra/middlewares/error-handler";
import { routes } from "./infra/routes";

const app = express();
app.use(express.json());
app.use("/v1", routes);

app.use(errorHandler);

export { app };
