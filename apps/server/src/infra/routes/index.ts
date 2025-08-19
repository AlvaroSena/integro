import { Router } from "express";
import { userRoutes } from "./user.routes";
import { storeRoutes } from "./store.routes";
import { productRoutes } from "./product.routes";
import { saleChannelRoutes } from "./sale-channel.routes";
import { storeMovementRoutes } from "./store-movement.routes";

export const routes = Router();
routes.use("/users", userRoutes);
routes.use("/stores", storeRoutes);
routes.use("/products", productRoutes);
routes.use("/sale-channels", saleChannelRoutes);
routes.use("/store-movements", storeMovementRoutes);
