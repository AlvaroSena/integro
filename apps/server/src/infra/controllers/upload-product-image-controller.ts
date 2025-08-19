import { Request, Response, NextFunction } from "express";
import { UploadProductImage } from "../../application/usecases/upload-product-image";
import { z } from "zod";

export class UploadProductImageController {
  async handle(request: Request, reply: Response, next: NextFunction) {
    const uploadProductImageRequestUser = z.object({
      sub: z.uuid(),
    });

    const uploadProductImageRequestParams = z.object({
      id: z.uuid(),
    });

    const uploadProductImageRequestFile = z.object({
      originalname: z.string(),
      mimetype: z.string().regex(/^image\//, "File must be an image"),
      buffer: z.instanceof(Buffer),
    });

    try {
      const { sub } = uploadProductImageRequestUser.parse(request.user);
      const { id } = uploadProductImageRequestParams.parse(request.params);

      const { originalname, buffer, mimetype } =
        uploadProductImageRequestFile.parse(request.file);

      const uploadProductImageImage = new UploadProductImage();
      const imageUrl = await uploadProductImageImage.execute({
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
