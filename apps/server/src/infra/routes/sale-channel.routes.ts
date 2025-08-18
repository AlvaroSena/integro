import { Router } from "express";
import { verifyToken } from "../middlewares/verify-token";
import { CreateSaleChannelController } from "../controllers/create-sale-channel-controller";
import { ListSaleChannelsController } from "../controllers/list-sale-channels-controller";
import { GetSaleChannelController } from "../controllers/get-sale-channel-controller";
import { UpdateSaleChannelController } from "../controllers/update-sale-channel-controller";
import { DeleteSaleChannelController } from "../controllers/delete-sale-channel-controller";

export const saleChannelRoutes = Router();

const createSaleChannelController = new CreateSaleChannelController();
const listSaleChannelsController = new ListSaleChannelsController();
const getSaleChannelController = new GetSaleChannelController();
const updateSaleChannelController = new UpdateSaleChannelController();
const deleteSaleChannelController = new DeleteSaleChannelController();

saleChannelRoutes.post("/", verifyToken, createSaleChannelController.handle);
saleChannelRoutes.get(
  "/store/:storeId",
  verifyToken,
  listSaleChannelsController.handle
);
saleChannelRoutes.get("/:id", verifyToken, getSaleChannelController.handle);
saleChannelRoutes.put(
  "/update/:id",
  verifyToken,
  updateSaleChannelController.handle
);
saleChannelRoutes.delete(
  "/delete/:id",
  verifyToken,
  deleteSaleChannelController.handle
);
