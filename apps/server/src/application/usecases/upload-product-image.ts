import { PutObjectCommand } from "@aws-sdk/client-s3";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { sanitizeFileName } from "../../utils/sanitize-filename";
import { prisma } from "../../infra/prisma";
import { s3 } from "../../utils/s3";
import { env } from "../../utils/env";

interface UploadProductImageRequest {
  ownerId: string;
  id: string;
  originalname: string;
  mimetype: string;
  buffer: Buffer;
}

export class UploadProductImage {
  async execute({
    ownerId,
    id,
    originalname,
    mimetype,
    buffer,
  }: UploadProductImageRequest) {
    const product = await prisma.product.findUnique({
      where: {
        id,
        AND: {
          store: {
            ownerId,
          },
        },
      },
    });

    if (!product) {
      throw new ResourceNotFoundError("Product not found");
    }

    const bucket = env.AWS_BUCKET;
    const sanitizedName = sanitizeFileName(originalname);

    const key = `products/${Date.now()}-${sanitizedName}`;

    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: buffer,
      ContentType: mimetype,
    });

    await s3.send(command);

    const imageUrl = `https://${bucket}.s3.${env.AWS_REGION}.amazonaws.com/${key}`;

    await prisma.product.update({
      where: {
        id: product.id,
      },
      data: {
        imageUrl,
      },
    });

    return {
      imageUrl,
    };
  }
}
