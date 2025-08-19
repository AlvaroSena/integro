import { prisma } from "../../infra/prisma";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface ListStoreMovementsRequest {
  ownerId: string;
  storeId: string;
}

export class ListStoreMovements {
  async execute({ ownerId, storeId }: ListStoreMovementsRequest) {
    const store = await prisma.store.findUnique({
      where: {
        id: storeId,
        AND: {
          ownerId,
        },
      },
    });

    if (!store) {
      throw new ResourceNotFoundError("Store not found");
    }

    const storeMovements = await prisma.storeMovement.findMany({
      where: {
        storeId,
      },
    });

    return {
      storeMovements,
    };
  }
}
