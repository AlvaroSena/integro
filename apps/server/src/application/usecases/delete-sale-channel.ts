import { prisma } from "../../infra/prisma";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface DeleteSaleChannelRequest {
  id: string;
  ownerId: string;
}

export class DeleteSaleChannel {
  async execute({ id, ownerId }: DeleteSaleChannelRequest) {
    const saleChannel = await prisma.saleChannel.findUnique({
      where: {
        id,
        AND: {
          Store: {
            ownerId,
          },
        },
      },
    });

    if (!saleChannel) {
      throw new ResourceNotFoundError("Sale channel not found");
    }

    await prisma.saleChannel.delete({
      where: {
        id,
      },
    });
  }
}
