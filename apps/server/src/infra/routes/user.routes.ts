import { Router } from "express";
import { CreateUserController } from "../controllers/create-user-controller";

export const userRoutes = Router();

const createUserController = new CreateUserController();

userRoutes.post("/", createUserController.handle);
