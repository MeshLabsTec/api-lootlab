export class ImageNotFoundError extends Error {
  constructor() {
    super("Imagem não encontrada");
    this.name = "ImageNotFoundError";
  }
}
