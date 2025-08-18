import { prisma } from "../../infra/prisma";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface UpdateSaleChannelRequest {
  id: string;
  name: string;
  ownerId: string;
}

export class UpdateSaleChannel {
  async execute({ id, name, ownerId }: UpdateSaleChannelRequest) {
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

    await prisma.saleChannel.update({
      where: {
        id: saleChannel.id,
      },
      data: {
        name,
      },
    });

    return {
      saleChannelId: saleChannel.id,
    };
  }
}
