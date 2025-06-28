export class InvalidSeasonError extends Error {
  constructor() {
    super("Temporada não encontrada ou inválida");
  }
}
