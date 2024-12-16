import type { FastifyInstance } from "fastify/types/instance";
import { createPostController } from "./createPostController";
import { findManyPostsController } from "./findManyPostController";
import { findByIdPostController } from "./findByIdPostController";
import { validateJWT } from "@/http/middleware/validateJWT";
import { findBySlugPostController } from "./findBySlugController";

export function postRouter(app: FastifyInstance) {
  app.post("/v1/post", { preHandler: [validateJWT] }, createPostController);
  // GET
  app.get("/v1/post/:id", findByIdPostController);
  app.get("/v1/post/slug/:slug", findBySlugPostController);
  app.get("/v1/post", findManyPostsController);
}
