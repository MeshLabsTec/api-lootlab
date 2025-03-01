import { PrismaCarouselRepository } from "@/repositories/Prisma/PrismaCarouselRepository";
import { ListImagesUseCase } from "@/useCases/Carousel/ListImagesUseCase";

export function makeListImagesUseCase() {
  const prismaCarouselRepository = new PrismaCarouselRepository();
  const listImagesUseCase = new ListImagesUseCase(prismaCarouselRepository);

  return listImagesUseCase;
}
