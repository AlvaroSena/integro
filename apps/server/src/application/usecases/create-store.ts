import { prisma } from "../../infra/prisma";

interface CreateStoreRequest {
  userId: string;
  name: string;
}

export class CreateStore {
  async execute({ userId, name }: CreateStoreRequest) {
    const stores = await prisma.store.findMany({
      where: {
        ownerId: userId,
      },
    });

    if (stores.length === 2) {
      throw new Error(); // error
    }

    const store = await prisma.store.create({
      data: {
        name,
        ownerId: userId,
      },
    });

    return {
      storeId: store.id,
    };
  }
}
