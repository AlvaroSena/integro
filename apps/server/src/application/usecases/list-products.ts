import { prisma } from "../../infra/prisma";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface ListProductsRequest {
  storeId: string;
  ownerId: string;
}

export class ListProducts {
  async execute({ storeId, ownerId }: ListProductsRequest) {
    const store = await prisma.store.findUnique({
      where: {
        id: storeId,
        ownerId,
      },
    });

    if (!store) {
      throw new ResourceNotFoundError("Store not found");
    }

    const products = await prisma.product.findMany({
      where: {
        storeId,
      },
    });

    return {
      products,
    };
  }
}
