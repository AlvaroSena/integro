import { prisma } from "../../infra/prisma";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface DeleteStoreRequest {
  ownerId: string;
  id: string;
}

export class DeleteStore {
  async execute({ ownerId, id }: DeleteStoreRequest) {
    const store = await prisma.store.findUnique({
      where: {
        id,
      },
    });

    if (!store) {
      throw new ResourceNotFoundError("Store not found");
    }

    await prisma.store.delete({
      where: {
        id,
        ownerId,
      },
    });
  }
}
