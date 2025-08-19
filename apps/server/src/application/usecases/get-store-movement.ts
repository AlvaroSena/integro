import { prisma } from "../../infra/prisma";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface GetStoreMovementRequest {
  ownerId: string;
  storeId: string;
  id: string;
}

export class GetStoreMovement {
  async execute({ ownerId, storeId, id }: GetStoreMovementRequest) {
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

    const storeMovement = await prisma.storeMovement.findUnique({
      where: {
        id,
      },
    });

    if (!storeMovement) {
      throw new ResourceNotFoundError("Store movement not found");
    }

    return {
      storeMovement,
    };
  }
}
