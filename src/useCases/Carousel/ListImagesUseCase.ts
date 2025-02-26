import { ICarouselRepository } from "@/repositories/interfaceRepository/ICarouselRepository";
import type { CarouselImage } from "@prisma/client";

export class ListImagesUseCase {
  constructor(private carouselRepository: ICarouselRepository) {}

  async execute(): Promise<CarouselImage[]> {
    const images = await this.carouselRepository.findAll();
    return images;
  }
}
