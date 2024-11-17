import type { FastifyInstance } from "fastify/types/instance";
import { createUserController } from "./createUserController";
import { loginUserController } from "./loginUserController";
import { findManyUserController } from "./findManyUserController";
import { findByIdUserController } from "./findByIdUserController";

export function userRouter(app: FastifyInstance) {
  app.post("/v1/user", createUserController);
  app.post("/v1/user/login", loginUserController);
  // GET
  app.get("/v1/user", findManyUserController);
  app.get("/v1/user/:id", findByIdUserController);
}
