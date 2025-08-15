import express from "express";
import { errorHandler } from "./infra/middlewares/error-handler";

const app = express();
app.use(express.json());

app.get("/", (request, reply) => {
  return reply.json({ message: "hello, world" });
});

app.use(errorHandler);

export { app };
