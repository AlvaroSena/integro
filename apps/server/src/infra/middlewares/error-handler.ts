import { Request, Response, NextFunction } from "express";
import { ZodError, z } from "zod";

export function errorHandler(
  err: unknown,
  request: Request,
  reply: Response,
  next: NextFunction
) {
  if (err instanceof ZodError) {
    return reply.status(400).json({ message: z.treeifyError(err) });
  }

  return reply.status(500).json({ message: err });
}
