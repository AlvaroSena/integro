import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { DeleteSaleChannel } from "../../application/usecases/delete-sale-channel";

export class DeleteSaleChannelController {
  async handle(request: Request, reply: Response, next: NextFunction) {
    const deleteSaleChannelRequestUser = z.object({
      sub: z.uuid(),
    });

    const deleteSaleChannelRequestParams = z.object({
      id: z.uuid(),
    });

    try {
      const { sub } = deleteSaleChannelRequestUser.parse(request.user);
      const { id } = deleteSaleChannelRequestParams.parse(request.params);

      const deleteSaleChannel = new DeleteSaleChannel();
      await deleteSaleChannel.execute({ id, ownerId: sub });

      return reply.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}
