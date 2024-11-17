import fastify from "fastify";
import { userRouter } from "./http/controllers/User/routes";
import jwt from "@fastify/jwt";
import { env } from "./env";
import { postRouter } from "./http/controllers/Post/routes";

export const app = fastify();

app.register(jwt, {
  secret: env.JWT_SECRET,
});

app.register(userRouter);
app.register(postRouter);
