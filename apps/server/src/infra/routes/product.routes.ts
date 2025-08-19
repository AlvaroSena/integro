import { Router } from "express";
import { upload } from "../../utils/multer";
import { verifyToken } from "../middlewares/verify-token";
import { CreateProductController } from "../controllers/create-product-controller";
import { ListProductsController } from "../controllers/list-products-controller";
import { GetProductController } from "../controllers/get-product-controller";
import { UpdateProductController } from "../controllers/update-product-controller";
import { DeleteProductController } from "../controllers/delete-product-controller";
import { UploadProductImageController } from "../controllers/upload-product-image-controller";

export const productRoutes = Router();
const createProductController = new CreateProductController();
const listProductsController = new ListProductsController();
const getProductController = new GetProductController();
const updateProductController = new UpdateProductController();
const deleteProductController = new DeleteProductController();
const uploadProductImageController = new UploadProductImageController();

productRoutes.post("/", verifyToken, createProductController.handle);
productRoutes.get("/:storeId", verifyToken, listProductsController.handle);
productRoutes.get(
  "/:id/store/:storeId",
  verifyToken,
  getProductController.handle
);
productRoutes.put(
  "/update/:id/:storeId",
  verifyToken,
  updateProductController.handle
);
productRoutes.delete(
  "/delete/:id/:storeId",
  verifyToken,
  deleteProductController.handle
);
productRoutes.patch(
  "/upload/:id",
  upload.single("image"),
  verifyToken,
  uploadProductImageController.handle
);
