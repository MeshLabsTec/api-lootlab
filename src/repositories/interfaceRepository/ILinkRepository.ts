import type { Link, Prisma } from "@prisma/client";

export interface ILinkRepository {
  create(data: Prisma.LinkCreateManyInput): Promise<Link>;
}
