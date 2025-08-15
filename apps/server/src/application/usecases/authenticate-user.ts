import { InvalidCredentialsError } from "../errors/invalid-credentials-error";
import { prisma } from "../../infra/prisma";
import { sign } from "jsonwebtoken";
import { compare } from "bcryptjs";

interface AuthenticateUserRequest {
  email: string;
  password: string;
}

export class AuthenticateUser {
  async execute({ email, password }: AuthenticateUserRequest) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new InvalidCredentialsError("Email ou senha inválido");
    }

    const passwordMatch = await compare(password, user.passwordHash);

    if (!passwordMatch) {
      throw new InvalidCredentialsError("Email ou senha inválido");
    }

    const token = sign(
      {
        sub: user.id,
      },
      process.env.AUTH_SECRET!,
      {
        expiresIn: "1d",
      }
    );

    return {
      token,
    };
  }
}
