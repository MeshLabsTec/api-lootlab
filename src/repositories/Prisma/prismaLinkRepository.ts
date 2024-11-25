import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
import type { ILinkRepository } from "../interfaceRepository/ILinkRepository";

export class PrismaLinkRepository implements ILinkRepository {
  async create(data: Prisma.LinkCreateManyInput) {
    const create = await prisma.link.create({ data });
    return create;
  }
}
