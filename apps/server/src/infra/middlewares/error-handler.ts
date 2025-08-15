import { Request, Response, NextFunction } from "express";
import { ZodError, z } from "zod";
import { InvalidCredentialsError } from "../../application/errors/invalid-credentials-error";

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
    return reply.status(409).json({ message: err.message });
  }

  return reply.status(500).json({ message: err });
}
