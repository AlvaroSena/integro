import { Request, Response, NextFunction } from "express";
import { ZodError, z } from "zod";
import { InvalidCredentialsError } from "../../application/errors/invalid-credentials-error";
import { EmailAlreadyTakenError } from "../../application/errors/email-already-taken-error";
import { StoreLimitExceededError } from "../../application/errors/store-limit-exceeded";
import { ResourceNotFoundError } from "../../application/errors/resource-not-found-error";

export function errorHandler(
  err: unknown,
  request: Request,
  reply: Response,
  next: NextFunction
) {
  if (err instanceof ZodError) {
    return reply.status(400).json({ message: z.treeifyError(err) });
  }

  if (err instanceof InvalidCredentialsError) {
    return reply.status(401).json({ message: err.message });
  }

  if (err instanceof EmailAlreadyTakenError) {
    return reply.status(409).json({ message: err.message });
  }

  if (err instanceof StoreLimitExceededError) {
    return reply.status(409).json({ message: err.message });
  }

  if (err instanceof ResourceNotFoundError) {
    return reply.status(404).json({ message: err.message });
  }

  console.log(err);
}
