import type { ICarouselRepository } from "@/repositories/interfaceRepository/ICarouselRepository";
import { AlreadyExistFilename } from "../@erros/Carousel/AlreadyExistFileName";

interface UploadCarouselImageRequest {
  title: string;
  filename: string;
  path: string;
  order?: number;
}

export class UploadCarouselImageUseCase {
  constructor(private carouselImageRepository: ICarouselRepository) {}

  async execute({ title, filename, path, order }: UploadCarouselImageRequest) {
    const findImageByFilename =
      await this.carouselImageRepository.findByFilename(filename);

    if (findImageByFilename) {
      throw new AlreadyExistFilename();
    }

    return this.carouselImageRepository.uploadImage(
      title,
      filename,
      path,
      order,
    );
  }
}
