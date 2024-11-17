import fastify from "fastify";
import { userRouter } from "./http/controllers/User/routes";
import jwt from "@fastify/jwt";

export const app = fastify();

app.register(jwt, {
  secret: "supersecret",
});

app.register(userRouter);
