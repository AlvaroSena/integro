import { Router } from "express";
import { CreateStoreController } from "../controllers/create-store-controller";
import { verifyToken } from "../middlewares/verify-token";
import { ListStoresController } from "../controllers/list-stores-controller";
import { GetStoreController } from "../controllers/get-store-controller";
import { UpdateStoreController } from "../controllers/update-store-controller";
import { DeleteStoreController } from "../controllers/delete-store-controller";
import { UploadStoreImageController } from "../controllers/upload-store-image-controller";
import { upload } from "../../utils/multer";

export const storeRoutes = Router();

const createStoreController = new CreateStoreController();
const listStoresController = new ListStoresController();
const getStoreController = new GetStoreController();
const updateStoreController = new UpdateStoreController();
const deleteStoreController = new DeleteStoreController();
const uploadStoreImageController = new UploadStoreImageController();

storeRoutes.post("/", verifyToken, createStoreController.handle);
storeRoutes.get("/", verifyToken, listStoresController.handle);
storeRoutes.get("/:id", verifyToken, getStoreController.handle);
storeRoutes.put("/update/:id", verifyToken, updateStoreController.handle);
storeRoutes.delete("/delete/:id", verifyToken, deleteStoreController.handle);
storeRoutes.patch(
  "/upload/:id",
  upload.single("image"),
  verifyToken,
  uploadStoreImageController.handle
);
