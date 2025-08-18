import { Request, Response, NextFunction } from "express";
import { UpdateSaleChannel } from "../../application/usecases/update-sale-channel";
import { z } from "zod";

export class UpdateSaleChannelController {
  async handle(request: Request, reply: Response, next: NextFunction) {
    const updateSaleChannelRequestUser = z.object({
      sub: z.uuid(),
    });

    const updateSaleChannelRequestParams = z.object({
      id: z.uuid(),
    });

    const updateSaleChannelRequestBody = z.object({
      name: z.string(),
    });

    try {
      const { sub } = updateSaleChannelRequestUser.parse(request.user);

      const { id } = updateSaleChannelRequestParams.parse(request.params);

      const { name } = updateSaleChannelRequestBody.parse(request.body);

      const updateSaleChannel = new UpdateSaleChannel();

      const saleChannel = await updateSaleChannel.execute({
        id,
        name,
        ownerId: sub,
      });

      return reply.status(201).send(saleChannel);
    } catch (err) {
      next(err);
    }
  }
}
