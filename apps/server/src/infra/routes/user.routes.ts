import { Router } from "express";
import { CreateUserController } from "../controllers/create-user-controller";
import { AuthenticateUserController } from "../controllers/authenticate-user-controller";
import { VerifyUserEmailController } from "../controllers/verify-user-email-controller";

export const userRoutes = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const verifyUserEmailController = new VerifyUserEmailController();

userRoutes.post("/", createUserController.handle);
userRoutes.post("/sessions", authenticateUserController.handle);
userRoutes.patch("/email/verify", verifyUserEmailController.handle);
