import { deleteImageFromR2 } from "@/lib/cloudflare";
import type { ICarouselRepository } from "@/repositories/interfaceRepository/ICarouselRepository";

export class DeleteImageUseCase {
  constructor(private carouselRepository: ICarouselRepository) {}

  async execute(id: string): Promise<void> {
    const image = await this.carouselRepository.findById(id);
    if (!image) {
      throw new Error("Imagem não encontrada");
    }

    await deleteImageFromR2(image.path);

    await this.carouselRepository.delete(id);
  }
}
