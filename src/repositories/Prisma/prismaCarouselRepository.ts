import { PrismaClient, type CarouselImage } from "@prisma/client";
import type { ICarouselRepository } from "../interfaceRepository/ICarouselRepository";
import { prisma } from "@/lib/prisma";

export class PrismaCarouselRepository implements ICarouselRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async uploadImage(title: string, filename: string, path: string, order = 0) {
    return await prisma.carouselImage.create({
      data: {
        title,
        filename,
        path,
        order,
      },
    });
  }

  async findAll(): Promise<CarouselImage[]> {
    return this.prisma.carouselImage.findMany({
      orderBy: { order: "asc" },
    });
  }

  async findById(id: string): Promise<CarouselImage | null> {
    return this.prisma.carouselImage.findUnique({
      where: { id },
    });
  }

  async findByFilename(filename: string): Promise<CarouselImage | null> {
    return this.prisma.carouselImage.findFirst({
      where: { filename },
    });
  }

  async update(
    id: string,
    data: Partial<CarouselImage>,
  ): Promise<CarouselImage> {
    return this.prisma.carouselImage.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.carouselImage.delete({
      where: { id },
    });
  }
}
