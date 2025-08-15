import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { AuthenticateUser } from "../../application/usecases/authenticate-user";

export class AuthenticateUserController {
  async handle(request: Request, reply: Response, next: NextFunction) {
    const authenticateUserRequestBody = z.object({
      email: z.email(),
      password: z.string().min(6),
    });

    try {
      const { email, password } = authenticateUserRequestBody.parse(
        request.body
      );

      const authenticate = new AuthenticateUser();
      const token = await authenticate.execute({ email, password });

      return reply.status(201).json(token);
    } catch (err) {
      next(err);
    }
  }
}
