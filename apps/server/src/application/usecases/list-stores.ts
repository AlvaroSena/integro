import { prisma } from "../../infra/prisma";

interface ListStoresRequest {
  ownerId: string;
}

export class ListStores {
  async execute({ ownerId }: ListStoresRequest) {
    const stores = await prisma.store.findMany({
      where: {
        ownerId,
      },
    });

    return {
      stores,
    };
  }
}
