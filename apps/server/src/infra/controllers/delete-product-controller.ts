import { Request, Response, type NextFunction } from "express";
import { DeleteProduct } from "../../application/usecases/delete-product";
import { z } from "zod";

export class DeleteProductController {
  async handle(request: Request, reply: Response, next: NextFunction) {
    const deleteProductRequestUser = z.object({
      sub: z.uuid(),
    });

    const deleteProductRequestParams = z.object({
      id: z.uuid(),
      storeId: z.uuid(),
    });

    try {
      const { sub } = deleteProductRequestUser.parse(request.user);

      const { id, storeId } = deleteProductRequestParams.parse(request.params);

      const deleteProduct = new DeleteProduct();

      await deleteProduct.execute({ id, storeId, ownerId: sub });

      return reply.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}
