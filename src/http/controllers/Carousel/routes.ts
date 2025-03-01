import { FastifyInstance } from "fastify";
import { deleteImageController } from "./deleteImageController";
import { listImagesController } from "./listImagesController";
import { uploadCarouselImageController } from "./uploadImageController";
import { validateJWT } from "@/http/middleware/validateJWT";

export async function carouselRouter(app: FastifyInstance) {
  app.get("/v1/carousel", listImagesController);
  app.post(
    "/v1/carousel/upload",
    {
      preHandler: [
        validateJWT({
          allowedRoles: ["ADMIN"],
        }),
      ],
    },
    uploadCarouselImageController,
  );
  app.delete(
    "/v1/carousel/:id",
    {
      preHandler: [
        validateJWT({
          allowedRoles: ["ADMIN"],
        }),
      ],
    },
    deleteImageController,
  );
}
