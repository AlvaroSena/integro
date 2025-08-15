import { prisma } from "../../infra/prisma";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface UpdateProductRequest {
  id: string;
  title: string;
  description?: string;
  coastPrice: number;
  salePrice: number;
  quantity: number;
  barcode: string;
  storeId: string;
  ownerId: string;
}

export class UpdateProduct {
  async execute({
    id,
    title,
    description,
    coastPrice,
    salePrice,
    quantity,
    barcode,
    storeId,
    ownerId,
  }: UpdateProductRequest) {
    const store = await prisma.store.findUnique({
      where: {
        id: storeId,
        ownerId,
      },
    });

    if (!store) {
      throw new ResourceNotFoundError("Store not found");
    }

    const product = await prisma.product.update({
      data: {
        title,
        description,
        coastPriceInCents: coastPrice * 100,
        salePriceInCents: salePrice * 100,
        quantity,
        barcode,
      },
      where: {
        id,
        storeId,
      },
    });

    return {
      productId: product.id,
    };
  }
}
