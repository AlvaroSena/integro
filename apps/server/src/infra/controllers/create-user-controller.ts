import { Request, Response, NextFunction } from "express";
import { CreateUser } from "../../application/usecases/create-user";
import { z } from "zod";

export class CreateUserController {
  async handle(request: Request, reply: Response, next: NextFunction) {
    const createUserRequestBody = z.object({
      name: z.string(),
      email: z.email(),
      password: z.string().min(6),
    });

    try {
      const { name, email, password } = createUserRequestBody.parse(
        request.body
      );

      const createUser = new CreateUser();
      const user = await createUser.execute({ name, email, password });

      return reply.status(201).json(user);
    } catch (err) {
      next(err);
    }
  }
}
