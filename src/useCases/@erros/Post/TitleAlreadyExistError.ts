export class TitleAlreadyExistError extends Error {
  constructor() {
    super("Já existe um post com esse título.");
  }
}
