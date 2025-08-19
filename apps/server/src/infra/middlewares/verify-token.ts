import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { env } from "../../utils/env";

interface Payload {
  sub: string;
}

declare module "express-serve-static-core" {
  interface Request {
    user?: Payload;
  }
}

export function verifyToken(
  request: Request,
  reply: Response,
  next: NextFunction
) {
  const authHeader = request.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return reply.status(401).json({ message: "Token missing" });
  }

  try {
    const payload = verify(token, env.AUTH_SECRET) as Payload;

    request.user = payload;
    next();
  } catch (error) {
    return reply.status(500).json({ error });
  }
}
