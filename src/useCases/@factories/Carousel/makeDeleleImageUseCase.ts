import { PrismaCarouselRepository } from "@/repositories/Prisma/PrismaCarouselRepository";
import { DeleteImageUseCase } from "@/useCases/Carousel/DeleteImageUseCase";

export function makeDeleteImageUseCase() {
  const carouselRepository = new PrismaCarouselRepository();
  return new DeleteImageUseCase(carouselRepository);
}
