import { createUserController } from "./createUserController";
import { loginUserController } from "./loginUserController";
import { findManyUserController } from "./findManyUserController";
import { findByIdUserController } from "./findByIdUserController";
import type { FastifyTypedInstance } from "@/types";
import { createUserSwaggerSchema } from "./SwaggerSchema/CreateUserSwaggerSchema";
import { loginUserSwaggerSchema } from "./SwaggerSchema/LoginUserSwaggerSchema";
import { findManyUserSwaggerSchema } from "./SwaggerSchema/FindManyUserSwaggerSchema";
import { findByIdUserSwaggerSchema } from "./SwaggerSchema/FindByidUserSwaggerSchema";

export function userRouter(app: FastifyTypedInstance) {
  app.post(
    "/v1/user",
    {
      schema: createUserSwaggerSchema,
    },
    createUserController,
  );
  app.post(
    "/v1/user/login",
    {
      schema: loginUserSwaggerSchema,
    },
    loginUserController,
  );
  // GET
  app.get(
    "/v1/user",
    {
      schema: findManyUserSwaggerSchema,
    },
    findManyUserController,
  );
  app.get(
    "/v1/user/:id",
    {
      schema: findByIdUserSwaggerSchema,
    },
    findByIdUserController,
  );
}
