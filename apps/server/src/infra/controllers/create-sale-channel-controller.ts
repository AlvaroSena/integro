import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { CreateSaleChannel } from "../../application/usecases/create-sale-channel";

export class CreateSaleChannelController {
  async handle(request: Request, reply: Response, next: NextFunction) {
    const createSaleChannelRequestUser = z.object({
      sub: z.uuid(),
    });

    const createSaleChannelRequestBody = z.object({
      name: z.string(),
      storeId: z.uuid(),
    });

    try {
      const { sub } = createSaleChannelRequestUser.parse(request.user);

      const { name, storeId } = createSaleChannelRequestBody.parse(
        request.body
      );

      const createSaleChannel = new CreateSaleChannel();

      const saleChannel = await createSaleChannel.execute({
        name,
        storeId,
        ownerId: sub,
      });

      return reply.status(201).send(saleChannel);
    } catch (err) {
      next(err);
    }
  }
}
