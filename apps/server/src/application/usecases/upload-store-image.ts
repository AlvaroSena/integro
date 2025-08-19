import { PutObjectCommand } from "@aws-sdk/client-s3";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { sanitizeFileName } from "../../utils/sanitize-fileName";
import { prisma } from "../../infra/prisma";
import { s3 } from "../../utils/s3";
import { env } from "../../utils/env";

interface UploadStoreImageRequest {
  ownerId: string;
  id: string;
  originalname: string;
  mimetype: string;
  buffer: Buffer;
}

export class UploadStoreImage {
  async execute({
    ownerId,
    id,
    originalname,
    mimetype,
    buffer,
  }: UploadStoreImageRequest) {
    const store = await prisma.store.findUnique({
      where: {
        id,
        ownerId,
      },
    });

    if (!store) {
      throw new ResourceNotFoundError("Store not found");
    }

    const bucket = env.AWS_BUCKET;
    const sanitizedName = sanitizeFileName(originalname);

    const key = `stores/${Date.now()}-${sanitizedName}`;

    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: buffer,
      ContentType: mimetype,
    });

    await s3.send(command);

    const imageUrl = `https://${bucket}.s3.${env.AWS_REGION}.amazonaws.com/${key}`;

    await prisma.store.update({
      where: {
        id: store.id,
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
