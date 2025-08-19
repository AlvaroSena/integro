import { Request, Response, NextFunction } from "express";
import { UploadStoreImage } from "../../application/usecases/upload-store-image";
import { z } from "zod";

export class UploadStoreImageController {
  async handle(request: Request, reply: Response, next: NextFunction) {
    const uploadStoreImageRequestUser = z.object({
      sub: z.uuid(),
    });

    const uploadStoreImageRequestParams = z.object({
      id: z.uuid(),
    });

    const uploadStoreImageRequestFile = z.object({
      originalname: z.string(),
      mimetype: z.string().regex(/^image\//, "File must be an image"),
      buffer: z.instanceof(Buffer),
    });

    try {
      const { sub } = uploadStoreImageRequestUser.parse(request.user);
      const { id } = uploadStoreImageRequestParams.parse(request.params);

      const { originalname, buffer, mimetype } =
        uploadStoreImageRequestFile.parse(request.file);

      const uploadStoreImage = new UploadStoreImage();
      const imageUrl = await uploadStoreImage.execute({
        ownerId: sub,
        id,
        originalname,
        mimetype,
        buffer,
      });

      return reply.status(201).send(imageUrl);
    } catch (err) {
      next(err);
    }
  }
}
