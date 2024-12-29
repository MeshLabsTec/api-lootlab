import { createUserController } from "./createUserController";
import { loginUserController } from "./loginUserController";
import { findManyUserController } from "./findManyUserController";
import { findByIdUserController } from "./findByIdUserController";
import type { FastifyTypedInstance } from "@/types";
import { validateJWT } from "@/http/middleware/validateJWT";
import { updateByIdUserController } from "./updateByIdUserController";

export function userRouter(app: FastifyTypedInstance) {
  app.post("/v1/user", createUserController);
  app.post("/v1/user/login", loginUserController);
  // GET
  app.get("/v1/user", findManyUserController);
  app.get("/v1/user/:id", findByIdUserController);
  // PUT
  app.put(
    "/v1/user/:id",
    {
      preHandler: [validateJWT()],
    },
    updateByIdUserController,
  );
}
