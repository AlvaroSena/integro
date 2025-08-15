import { Request, Response, NextFunction } from "express";
import { CreateStore } from "../../application/usecases/create-store";
import { z } from "zod";

export class CreateStoreController {
  async handle(request: Request, reply: Response, next: NextFunction) {
    const createStoreRequestUser = z.object({
      sub: z.uuid(),
    });

    const createStoreRequestBody = z.object({
      name: z.string(),
    });

    try {
      const { sub } = createStoreRequestUser.parse(request.user);
      const { name } = createStoreRequestBody.parse(request.body);

      const createStore = new CreateStore();
      const store = await createStore.execute({ userId: sub, name });

      return reply.status(201).json(store);
    } catch (err) {
      next(err);
    }
  }
}
