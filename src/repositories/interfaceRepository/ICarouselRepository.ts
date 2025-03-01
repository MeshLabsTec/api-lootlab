import type { CarouselImage } from "@prisma/client";

export interface ICarouselRepository {
  uploadImage(
    title: string,
    filename: string,
    path: string,
    order?: number,
  ): Promise<unknown>;
  findAll(): Promise<CarouselImage[]>;
  findById(id: string): Promise<CarouselImage | null>;
  findByFilename(filename: string): Promise<CarouselImage | null>;
  update(id: string, data: Partial<CarouselImage>): Promise<CarouselImage>;
  delete(id: string): Promise<void>;
}
