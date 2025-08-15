import { Request, Response, type NextFunction } from "express";
import { ListProducts } from "../../application/usecases/list-products";
import { z } from "zod";

export class ListProductsController {
  async handle(request: Request, reply: Response, next: NextFunction) {
    const listProductsRequestUser = z.object({
      sub: z.uuid(),
    });

    const listProductsRequestParams = z.object({
      storeId: z.uuid(),
    });

    try {
      const { sub } = listProductsRequestUser.parse(request.user);
      const { storeId } = listProductsRequestParams.parse(request.params);

      const listProducts = new ListProducts();

      const products = await listProducts.execute({ storeId, ownerId: sub });

      return reply.json(products);
    } catch (err) {
      next(err);
    }
  }
}
