import { hash } from "bcryptjs";
import { prisma } from "../../infra/prisma";
import { EmailAlreadyTakenError } from "../errors/email-already-taken-error";

interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}

export class CreateUser {
  async execute({ name, email, password }: CreateUserRequest) {
    const userAlreadyExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userAlreadyExists) {
      throw new EmailAlreadyTakenError();
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash: await hash(password, 6),
      },
    });

    return {
      userId: user.id,
    };
  }
}
