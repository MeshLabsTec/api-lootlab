import { PrismaCarouselRepository } from "@/repositories/Prisma/PrismaCarouselRepository";
import { UploadCarouselImageUseCase } from "@/useCases/Carousel/UploadImageUseCase";

export function makeUploadCarouselImageUseCase() {
  const carouselImageRepository = new PrismaCarouselRepository();
  return new UploadCarouselImageUseCase(carouselImageRepository);
}
