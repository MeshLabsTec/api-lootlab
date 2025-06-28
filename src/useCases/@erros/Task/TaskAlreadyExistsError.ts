export class TaskAlreadyExistsError extends Error {
  constructor() {
    super("Já existe uma tarefa com este nome para esta temporada");
  }
}
