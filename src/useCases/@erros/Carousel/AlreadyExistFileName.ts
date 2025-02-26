export class AlreadyExistFilename extends Error {
  constructor() {
    super("Já existe uma imagem com esse nome");
    this.name = "AlreadyExistFilename";
  }
}
