import { Request, Response, NextFunction } from "express";
import { DeleteStore } from "../../application/usecases/delete-store";
import { z } from "zod";

export class DeleteStoreController {
  async handle(request: Request, reply: Response, next: NextFunction) {
    const deleteStoreRequestUser = z.object({
      sub: z.uuid(),
    });

    const deleteStoreRequestParams = z.object({
      id: z.uuid(),
    });

    try {
      const { sub } = deleteStoreRequestUser.parse(request.user);
      const { id } = deleteStoreRequestParams.parse(request.params);

      const deleteStore = new DeleteStore();
      await deleteStore.execute({ ownerId: sub, id });

      return reply.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}
