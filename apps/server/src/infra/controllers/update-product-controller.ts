import { Request, Response, type NextFunction } from "express";
import { UpdateProduct } from "../../application/usecases/update-product";
import { z } from "zod";

export class UpdateProductController {
  async handle(request: Request, reply: Response, next: NextFunction) {
    const updateProductRequestUser = z.object({
      sub: z.uuid(),
    });

    const updateProductRequestParams = z.object({
      id: z.uuid(),
      storeId: z.uuid(),
    });

    const updateProductRequestBody = z.object({
      title: z.string(),
      description: z.string().optional(),
      coastPrice: z.number(),
      salePrice: z.number(),
      quantity: z.number(),
      barcode: z.string(),
    });

    try {
      const { sub } = updateProductRequestUser.parse(request.user);

      const { id, storeId } = updateProductRequestParams.parse(request.params);

      const { title, description, coastPrice, salePrice, quantity, barcode } =
        updateProductRequestBody.parse(request.body);

      const updateProduct = new UpdateProduct();

      const product = await updateProduct.execute({
        id,
        title,
        description,
        coastPrice,
        salePrice,
        quantity,
        barcode,
        storeId,
        ownerId: sub,
      });

      return reply.status(201).send(product);
    } catch (err) {
      next(err);
    }
  }
}
