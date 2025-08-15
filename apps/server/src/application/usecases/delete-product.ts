import { prisma } from "../../infra/prisma";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface DeleteProductRequest {
  id: string;
  storeId: string;
  ownerId: string;
}

export class DeleteProduct {
  async execute({ id, storeId, ownerId }: DeleteProductRequest) {
    const store = await prisma.store.findUnique({
      where: {
        id: storeId,
        ownerId,
      },
    });

    if (!store) {
      throw new ResourceNotFoundError("Store not found");
    }

    await prisma.product.delete({
      where: {
        id,
        storeId,
      },
    });
  }
}
