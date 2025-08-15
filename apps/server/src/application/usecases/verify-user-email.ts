import { prisma } from "../../infra/prisma";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface VerifyUserEmailRequest {
  email: string;
}

export class VerifyUserEmail {
  async execute({ email }: VerifyUserEmailRequest) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new ResourceNotFoundError("User not found");
    }

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        isEmailVerified: true,
      },
    });
  }
}
