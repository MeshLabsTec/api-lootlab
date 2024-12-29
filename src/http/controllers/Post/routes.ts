import { createPostController } from "./createPostController";
import { findManyPostsController } from "./findManyPostController";
import { findByIdPostController } from "./findByIdPostController";
import { validateJWT } from "@/http/middleware/validateJWT";
import { findBySlugPostController } from "./findBySlugController";
import { updateByIdPostController } from "./updateByIdPostController";
import type { FastifyTypedInstance } from "@/types";
import { deleteByIdPostController } from "./deleteByIdPostController";

export function postRouter(app: FastifyTypedInstance) {
  app.post(
    "/v1/post",
    {
      preHandler: [validateJWT],
    },
    createPostController,
  );
  // GET
  app.get(
    "/v1/post/:id",
    {
      schema: {
        description: "Find a post by id",
        tags: ["Post"],
      },
    },
    findByIdPostController,
  );
  app.get(
    "/v1/post",
    {
      schema: {
        description: "Find many posts",
        tags: ["Post"],
      },
    },
    findManyPostsController,
  );
  app.get(
    "/v1/post/slug/:slug",
    {
      schema: {
        description: "Find a post by slug",
        tags: ["Post"],
      },
    },
    findBySlugPostController,
  );
  // PUT
  app.put(
    "/v1/post/:id",
    {
      preHandler: [validateJWT],
      schema: {
        description: "Update a post by id",
        tags: ["Post"],
      },
    },
    updateByIdPostController,
  );

  // DELETE
  app.delete("/v1/post/:id", deleteByIdPostController);
}
