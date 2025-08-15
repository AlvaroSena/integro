import { Router } from "express";
import { userRoutes } from "./user.routes";
import { storeRoutes } from "./store.routes";

export const routes = Router();
routes.use("/users", userRoutes);
routes.use("/stores", storeRoutes);
