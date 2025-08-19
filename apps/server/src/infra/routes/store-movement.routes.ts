import { Router } from "express";
import { verifyToken } from "../middlewares/verify-token";
import { CreateStoreMovementController } from "../controllers/create-store-movement-controller";
import { ListStoreMovementsController } from "../controllers/list-store-movements-controller";
import { GetStoreMovementController } from "../controllers/get-store-movement-controller";
import { DeleteStoreMovementController } from "../controllers/delete-store-movement-controller";

export const storeMovementRoutes = Router();

const createStoreMovementController = new CreateStoreMovementController();
const listStoreMovementsController = new ListStoreMovementsController();
const getStoreMovementController = new GetStoreMovementController();
const deleteStoreMovementController = new DeleteStoreMovementController();

storeMovementRoutes.post(
  "/",
  verifyToken,
  createStoreMovementController.handle
);
storeMovementRoutes.get(
  "/store/:storeId",
  verifyToken,
  listStoreMovementsController.handle
);
storeMovementRoutes.get(
  "/:id/store/:storeId",
  verifyToken,
  getStoreMovementController.handle
);
storeMovementRoutes.delete(
  "/delete/:id/store/:storeId",
  verifyToken,
  deleteStoreMovementController.handle
);
