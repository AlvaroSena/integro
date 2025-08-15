import { Request, Response, type NextFunction } from "express";
import { CreateProduct } from "../../application/usecases/create-product";
import { z } from "zod";

export class CreateProductController {
  async handle(request: Request, reply: Response, next: NextFunction) {
    const createProductRequestUser = z.object({
      sub: z.uuid(),
    });

    const createProductRequestBody = z.object({
      title: z.string(),
      description: z.string().optional(),
      coastPrice: z.number(),
      salePrice: z.number(),
      quantity: z.number(),
      barcode: z.string(),
      storeId: z.uuid(),
    });

    try {
      const { sub } = createProductRequestUser.parse(request.user);

      const {
        title,
        description,
        coastPrice,
        salePrice,
        quantity,
        barcode,
        storeId,
      } = createProductRequestBody.parse(request.body);

      const createProdut = new CreateProduct();

      const product = await createProdut.execute({
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
