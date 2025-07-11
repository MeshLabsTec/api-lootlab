import fastify from "fastify";
import { userRouter } from "./http/controllers/User/routes";
import jwt from "@fastify/jwt";
import { env } from "./env";
import { postRouter } from "./http/controllers/Post/routes";
import cors from "@fastify/cors";
import fastifyMultipart from "@fastify/multipart";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import {
  validatorCompiler,
  serializerCompiler,
  jsonSchemaTransform,
} from "fastify-type-provider-zod";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { carouselRouter } from "./http/controllers/Carousel/routes";

export const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(cors, {
  origin: ["https://lootlab.xyz", "https://bright-taffy-598d3b.netlify.app", "http://localhost:3000"],
  credentials: true,
});

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "API",
      version: "1.0.0",
    },
  },
  transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUi, {
  routePrefix: "/docs",
});

app.register(jwt, {
  secret: env.JWT_SECRET,
});

app.register(fastifyMultipart, { limits: { fileSize: 50 * 1024 * 1024 } });
app.register(userRouter);
app.register(postRouter);
app.register(carouselRouter);
