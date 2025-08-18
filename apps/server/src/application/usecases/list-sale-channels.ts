import { prisma } from "../../infra/prisma";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface ListSaleChannelsRequest {
  storeId: string;
  ownerId: string;
}

export class ListSaleChannels {
  async execute({ storeId, ownerId }: ListSaleChannelsRequest) {
    const store = await prisma.store.findUnique({
      where: {
        id: storeId,
        ownerId,
      },
    });

    if (!store) {
      throw new ResourceNotFoundError("Store not found");
    }

    const saleChannels = await prisma.saleChannel.findMany({
      where: {
        storeId,
      },
    });

    return {
      saleChannels,
    };
  }
}
