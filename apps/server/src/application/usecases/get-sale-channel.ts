import { prisma } from "../../infra/prisma";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface GetSaleChannelRequest {
  id: string;
  ownerId: string;
}

export class GetSaleChannel {
  async execute({ id, ownerId }: GetSaleChannelRequest) {
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

    return {
      saleChannel,
    };
  }
}
