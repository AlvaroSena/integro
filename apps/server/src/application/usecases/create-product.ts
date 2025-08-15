import { prisma } from "../../infra/prisma";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface CreateProductRequest {
  title: string;
  description?: string;
  coastPrice: number;
  salePrice: number;
  quantity: number;
  barcode: string;
  storeId: string;
  ownerId: string;
}

export class CreateProduct {
  async execute({
    title,
    description,
    coastPrice,
    salePrice,
    quantity,
    barcode,
    storeId,
    ownerId,
  }: CreateProductRequest) {
    const store = await prisma.store.findUnique({
      where: {
        id: storeId,
        ownerId,
      },
    });

    if (!store) {
      throw new ResourceNotFoundError("Store not found");
    }

    const product = await prisma.product.create({
      data: {
        title,
        description,
        coastPriceInCents: coastPrice * 100,
        salePriceInCents: salePrice * 100,
        quantity,
        barcode,
        storeId,
      },
    });

    return {
      productId: product.id,
    };
  }
}
