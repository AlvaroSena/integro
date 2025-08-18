import { Request, Response, NextFunction } from "express";
import { GetSaleChannel } from "../../application/usecases/get-sale-channel";
import { z } from "zod";

export class GetSaleChannelController {
  async handle(request: Request, reply: Response, next: NextFunction) {
    const getSaleChannelRequestUser = z.object({
      sub: z.uuid(),
    });

    const getSaleChannelRequestParams = z.object({
      id: z.uuid(),
    });

    try {
      const { sub } = getSaleChannelRequestUser.parse(request.user);

      const { id } = getSaleChannelRequestParams.parse(request.params);

      const getSaleChannel = new GetSaleChannel();

      const saleChannel = await getSaleChannel.execute({
        id,
        ownerId: sub,
      });

      return reply.json(saleChannel);
    } catch (err) {
      next(err);
    }
  }
}
