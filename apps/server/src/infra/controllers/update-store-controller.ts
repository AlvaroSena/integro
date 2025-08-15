import { Request, Response, NextFunction } from "express";
import { UpdateStore } from "../../application/usecases/update-store";
import { z } from "zod";

export class UpdateStoreController {
  async handle(request: Request, reply: Response, next: NextFunction) {
    const updateStoreRequestUser = z.object({
      sub: z.uuid(),
    });

    const updateStoreRequestParams = z.object({
      id: z.uuid(),
    });

    const updateStoreRequestBody = z.object({
      name: z.string(),
    });

    try {
      const { sub } = updateStoreRequestUser.parse(request.user);
      const { id } = updateStoreRequestParams.parse(request.params);
      const { name } = updateStoreRequestBody.parse(request.body);

      const updateStore = new UpdateStore();
      const store = await updateStore.execute({ ownerId: sub, id, name });

      return reply.status(201).json(store);
    } catch (err) {
      next(err);
    }
  }
}
