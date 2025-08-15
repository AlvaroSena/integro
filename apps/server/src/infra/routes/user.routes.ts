import { Router } from "express";
import { CreateUserController } from "../controllers/create-user-controller";
import { AuthenticateUserController } from "../controllers/authenticate-user-controller";

export const userRoutes = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();

userRoutes.post("/", createUserController.handle);
userRoutes.post("/sessions", authenticateUserController.handle);
