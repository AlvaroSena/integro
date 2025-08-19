import { Request, Response, NextFunction } from "express";
import { ListStoreMovements } from "../../application/usecases/list-store-movements";
import { z } from "zod";

export class ListStoreMovementsController {
  async handle(request: Request, reply: Response, next: NextFunction) {
    const listStoreMovementsRequestUser = z.object({
      sub: z.uuid(),
    });

    const listStoreMovementsRequestParams = z.object({
      storeId: z.uuid(),
    });

    try {
      const { sub } = listStoreMovementsRequestUser.parse(request.user);
      const { storeId } = listStoreMovementsRequestParams.parse(request.params);

      const listStoreMovements = new ListStoreMovements();

      const storeMovements = await listStoreMovements.execute({
        ownerId: sub,
        storeId,
      });

      return reply.json(storeMovements);
    } catch (err) {
      next(err);
    }
  }
}
