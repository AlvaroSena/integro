import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { CreateStoreMovement } from "../../application/usecases/create-store-movement";

export class CreateStoreMovementController {
  async handle(request: Request, reply: Response, next: NextFunction) {
    const createStoreMovementRequestUser = z.object({
      sub: z.uuid(),
    });

    const createStoreMovementRequestBody = z.object({
      storeId: z.uuid(),
      saleChannelId: z.uuid(),
      productId: z.uuid(),
      type: z.enum(["INBOUND", "OUTBOUND"]),
      quantity: z.number(),
      notes: z.string().optional(),
    });

    try {
      const { sub } = createStoreMovementRequestUser.parse(request.user);
      const { storeId, saleChannelId, productId, type, quantity, notes } =
        createStoreMovementRequestBody.parse(request.body);

      const createStoreMovement = new CreateStoreMovement();

      const storeMovement = await createStoreMovement.execute({
        ownerId: sub,
        storeId,
        saleChannelId,
        productId,
        type,
        quantity,
        notes,
      });

      return reply.status(201).json(storeMovement);
    } catch (err) {
      next(err);
    }
  }
}
