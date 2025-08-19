import { prisma } from "../../infra/prisma";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface CreateStoreMovementRequest {
  ownerId: string;
  storeId: string;
  saleChannelId: string;
  productId: string;
  type: "INBOUND" | "OUTBOUND";
  quantity: number;
  notes?: string;
}

export class CreateStoreMovement {
  async execute({
    ownerId,
    storeId,
    saleChannelId,
    productId,
    type,
    quantity,
    notes,
  }: CreateStoreMovementRequest) {
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

    const saleChannel = await prisma.saleChannel.findUnique({
      where: {
        id: saleChannelId,
      },
    });

    if (!saleChannel) {
      throw new ResourceNotFoundError("Sale channel not found");
    }

    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      throw new ResourceNotFoundError("Product not found");
    }

    const storeMovement = await prisma.storeMovement.create({
      data: {
        storeId,
        saleChannelId,
        productId,
        quantity,
        notes,
      },
    });

    const balance = await prisma.stockBalance.findUnique({
      where: {
        storeId_productId: {
          storeId,
          productId,
        },
      },
    });

    const newQuantity =
      type === "INBOUND"
        ? (balance?.quantity ?? 0) + quantity
        : (balance?.quantity ?? 0) - quantity;

    if (balance) {
      await prisma.stockBalance.update({
        where: {
          id: balance.id,
        },
        data: {
          quantity: newQuantity,
        },
      });
    } else {
      await prisma.stockBalance.create({
        data: {
          storeId,
          productId,
          quantity: newQuantity,
        },
      });
    }

    return {
      storeMovementId: storeMovement.id,
    };
  }
}
