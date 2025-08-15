import { prisma } from "../../infra/prisma";

interface GetStoreRequest {
  ownerId: string;
  id: string;
}

export class GetStore {
  async execute({ ownerId, id }: GetStoreRequest) {
    const store = await prisma.store.findUnique({
      where: {
        id,
        ownerId,
      },
    });

    return {
      store,
    };
  }
}
