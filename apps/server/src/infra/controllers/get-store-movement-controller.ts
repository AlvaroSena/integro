import { Request, Response, NextFunction } from "express";
import { GetStoreMovement } from "../../application/usecases/get-store-movement";
import { z } from "zod";

export class GetStoreMovementController {
  async handle(request: Request, reply: Response, next: NextFunction) {
    const getStoreMovementRequestUser = z.object({
      sub: z.uuid(),
    });

    const getStoreMovementRequestParams = z.object({
      id: z.uuid(),
      storeId: z.uuid(),
    });

    try {
      const { sub } = getStoreMovementRequestUser.parse(request.user);
      const { id, storeId } = getStoreMovementRequestParams.parse(
        request.params
      );

      const getStoreMovement = new GetStoreMovement();

      const storeMovement = await getStoreMovement.execute({
        ownerId: sub,
        storeId,
        id,
      });

      return reply.json(storeMovement);
    } catch (err) {
      next(err);
    }
  }
}
