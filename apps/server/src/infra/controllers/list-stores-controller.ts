import { Request, Response, NextFunction } from "express";
import { ListStores } from "../../application/usecases/list-stores";
import { z } from "zod";

export class ListStoresController {
  async handle(request: Request, reply: Response, next: NextFunction) {
    const createStoreRequestUser = z.object({
      sub: z.uuid(),
    });

    try {
      const { sub } = createStoreRequestUser.parse(request.user);

      const listStores = new ListStores();
      const stores = await listStores.execute({ ownerId: sub });

      return reply.json(stores);
    } catch (err) {
      next(err);
    }
  }
}
