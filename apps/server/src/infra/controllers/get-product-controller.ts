import { Request, Response, type NextFunction } from "express";
import { GetProduct } from "../../application/usecases/get-product";
import { z } from "zod";

export class GetProductController {
  async handle(request: Request, reply: Response, next: NextFunction) {
    const getProductRequestUser = z.object({
      sub: z.uuid(),
    });

    const getProductRequestParams = z.object({
      id: z.uuid(),
      storeId: z.uuid(),
    });

    try {
      const { sub } = getProductRequestUser.parse(request.user);
      const { id, storeId } = getProductRequestParams.parse(request.params);

      const getProduct = new GetProduct();

      const products = await getProduct.execute({ id, storeId, ownerId: sub });

      return reply.json(products);
    } catch (err) {
      next(err);
    }
  }
}
