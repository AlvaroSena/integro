import express, { Application, Request, Response } from "express";
import cors from "cors";
import { errorHandler } from "./infra/middlewares/error-handler";
import { routes } from "./infra/routes";
import { env } from "./utils/env";

const app: Application = express();
app.use(
  cors({
    origin: env.WEB_ORIGIN,
    methods: "*",
  })
);
app.use(express.json());
app.use("/v1", routes);

app.get("/", (request: Request, reply: Response) => {
  return reply.json({ message: "Hello from Integro" });
});

app.use(errorHandler);

export { app };
