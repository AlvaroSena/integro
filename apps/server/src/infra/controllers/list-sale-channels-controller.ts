import { Request, Response, NextFunction } from "express";
import { ListSaleChannels } from "../../application/usecases/list-sale-channels";
import { z } from "zod";

export class ListSaleChannelsController {
  async handle(request: Request, reply: Response, next: NextFunction) {
    const listSaleChannelsRequestUser = z.object({
      sub: z.uuid(),
    });

    const listSaleChannelsRequestParams = z.object({
      storeId: z.uuid(),
    });

    try {
      const { sub } = listSaleChannelsRequestUser.parse(request.user);

      const { storeId } = listSaleChannelsRequestParams.parse(request.params);

      const listSaleChannels = new ListSaleChannels();

      const saleChannels = await listSaleChannels.execute({
        storeId,
        ownerId: sub,
      });

      return reply.json(saleChannels);
    } catch (err) {
      next(err);
    }
  }
}
