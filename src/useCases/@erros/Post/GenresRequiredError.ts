export class GenresRequiredError extends Error {
  constructor() {
    super("Gêneros são obrigatórios");
  }
}
