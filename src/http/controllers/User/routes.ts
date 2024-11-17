import type { FastifyInstance } from "fastify/types/instance";
import { createUserController } from "./createUserController";
import { loginUserController } from "./loginUserController";

export function userRouter(app: FastifyInstance) {
  app.post("/v1/user", createUserController);
  app.post("/v1/user/login", loginUserController);
}
