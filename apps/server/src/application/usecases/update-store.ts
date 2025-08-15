import { prisma } from "../../infra/prisma";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface UpdateStoreRequest {
  ownerId: string;
  id: string;
  name: string;
}

export class UpdateStore {
  async execute({ ownerId, id, name }: UpdateStoreRequest) {
    const store = await prisma.store.findUnique({
      where: {
        id,
      },
    });

    if (!store) {
      throw new ResourceNotFoundError("Store not found");
    }

    const updatedStore = await prisma.store.update({
      data: {
        name,
      },
      where: {
        id,
        ownerId,
      },
    });

    return {
      storeId: updatedStore.id,
    };
  }
}
