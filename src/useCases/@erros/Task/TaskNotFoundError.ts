export class TaskNotFoundError extends Error {
  constructor() {
    super("Tarefa não encontrada");
  }
}
