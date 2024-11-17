import type { FastifyReply, FastifyRequest } from "fastify";
import { makeCreatePostUseCase } from "@/useCases/@factories/Post/makeCreatePostUseCase";
import { createPostSchema } from "./schemas/createPostSchema";
import { PostNotFoundError } from "@/useCases/@erros/Post/PostNotFoundError";

export async function createPostController(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  const { title, content, summary, imageUrl } = createPostSchema.parse(
    req.body,
  );
  console.log(req.user);
  const { id: authorId } = req.user as { id: string };
  try {
    const makeCreatePost = makeCreatePostUseCase();
    const post = await makeCreatePost.execute({
      title,
      content,
      summary,
      imageUrl,
      authorId,
    });

    return reply.status(201).send(post);
  } catch (error) {
    if (error instanceof PostNotFoundError) {
      return reply.status(404).send({ error: error.message });
    }
    return reply.status(500).send({ error: error.message });
  }
}
