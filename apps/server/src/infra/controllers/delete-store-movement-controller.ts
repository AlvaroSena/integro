import { Request, Response, NextFunction } from "express";
import { DeleteStoreMovement } from "../../application/usecases/delete-store-movement";
import { z } from "zod";

export class DeleteStoreMovementController {
  async handle(request: Request, reply: Response, next: NextFunction) {
    const deleteStoreMovementRequestUser = z.object({
      sub: z.uuid(),
    });

    const deleteStoreMovementRequestParams = z.object({
      id: z.uuid(),
      storeId: z.uuid(),
    });

    try {
      const { sub } = deleteStoreMovementRequestUser.parse(request.user);
      const { id, storeId } = deleteStoreMovementRequestParams.parse(
        request.params
      );

      const deleteStoreMovement = new DeleteStoreMovement();

      const storeMovement = await deleteStoreMovement.execute({
        ownerId: sub,
        storeId,
        id,
      });

      return reply.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}
