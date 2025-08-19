import { prisma } from "../../infra/prisma";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface DeleteStoreMovementRequest {
  ownerId: string;
  storeId: string;
  id: string;
}

export class DeleteStoreMovement {
  async execute({ ownerId, storeId, id }: DeleteStoreMovementRequest) {
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

    await prisma.storeMovement.delete({
      where: {
        id,
      },
    });
  }
}
