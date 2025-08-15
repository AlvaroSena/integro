import { Request, Response, NextFunction } from "express";
import { VerifyUserEmail } from "../../application/usecases/verify-user-email";
import { z } from "zod";

export class VerifyUserEmailController {
  async handle(request: Request, reply: Response, next: NextFunction) {
    const verifyUserEmailRequestBody = z.object({
      email: z.email(),
    });

    try {
      const { email } = verifyUserEmailRequestBody.parse(request.body);

      const verifyUserEmail = new VerifyUserEmail();

      await verifyUserEmail.execute({ email });

      return reply.status(201).send();
    } catch (err) {
      next(err);
    }
  }
}
