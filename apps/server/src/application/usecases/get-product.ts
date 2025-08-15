import { prisma } from "../../infra/prisma";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface GetProductRequest {
  id: string;
  storeId: string;
  ownerId: string;
}

export class GetProduct {
  async execute({ id, storeId, ownerId }: GetProductRequest) {
    const store = await prisma.store.findUnique({
      where: {
        id: storeId,
        ownerId,
      },
    });

    if (!store) {
      throw new ResourceNotFoundError("Store not found");
    }

    const product = await prisma.product.findUnique({
      where: {
        id,
        storeId,
      },
    });

    if (!product) {
      throw new ResourceNotFoundError("Product not found");
    }

    return {
      product,
    };
  }
}
