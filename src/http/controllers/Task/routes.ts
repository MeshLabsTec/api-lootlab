import { createTaskController } from "./createTaskController";
import { findByIdTaskController } from "./findByIdTaskController";
import { findManyTaskController } from "./findManyTaskController";
import { updateByIdTaskController } from "./updateByIdTaskController";
import { deleteByIdTaskController } from "./deleteByIdTaskController";
import type { FastifyTypedInstance } from "@/types";
import { validateJWT } from "@/http/middleware/validateJWT";

export function taskRouter(app: FastifyTypedInstance) {
  // POST - Criar nova tarefa (apenas admins)
  app.post(
    "/v1/task",
    {
      preHandler: [validateJWT()],
    },
    createTaskController,
  );

  // GET - Buscar todas as tarefas (com filtro opcional por temporada)
  app.get("/v1/task", findManyTaskController);

  // GET - Buscar tarefa por ID
  app.get("/v1/task/:id", findByIdTaskController);

  // PUT - Atualizar tarefa por ID (apenas admins)
  app.put(
    "/v1/task/:id",
    {
      preHandler: [validateJWT()],
    },
    updateByIdTaskController,
  );

  // DELETE - Deletar tarefa por ID (apenas admins)
  app.delete(
    "/v1/task/:id",
    {
      preHandler: [validateJWT()],
    },
    deleteByIdTaskController,
  );
}
