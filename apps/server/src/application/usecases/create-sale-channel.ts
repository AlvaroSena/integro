import { prisma } from "../../infra/prisma";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface CreateSaleChannelRequest {
  name: string;
  storeId: string;
  ownerId: string;
}

export class CreateSaleChannel {
  async execute({ name, storeId, ownerId }: CreateSaleChannelRequest) {
    const store = await prisma.store.findUnique({
      where: {
        id: storeId,
        ownerId,
      },
    });

    if (!store) {
      throw new ResourceNotFoundError("Store not found");
    }

    const saleChannel = await prisma.saleChannel.create({
      data: {
        name,
        storeId: store.id,
      },
    });

    return {
      saleChannelId: saleChannel.id,
    };
  }
}
