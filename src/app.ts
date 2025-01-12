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

export const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(cors, {
  origin: [
    "https://lootlab.xyz",
    "https://develop-lootlab.netlify.app",
    "http://localhost:3000",
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
});

app.addHook("preHandler", async (req, reply) => {
  reply.headers({
    "Access-Control-Allow-Origin": req.headers.origin || "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  });
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
