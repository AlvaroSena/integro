import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { GetStore } from "../../application/usecases/get-store";

export class GetStoreController {
  async handle(request: Request, reply: Response, next: NextFunction) {
    const createStoreRequestUser = z.object({
      sub: z.uuid(),
    });

    const createStoreRequestParams = z.object({
      id: z.uuid(),
    });

    try {
      const { sub } = createStoreRequestUser.parse(request.user);
      const { id } = createStoreRequestParams.parse(request.params);

      const getStore = new GetStore();
      const store = await getStore.execute({ ownerId: sub, id });

      return reply.json(store);
    } catch (err) {
      next(err);
    }
  }
}
