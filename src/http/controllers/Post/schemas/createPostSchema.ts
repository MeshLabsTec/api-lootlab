import { z } from "zod";

const LinkSchema = z.object({
  url: z.string().url("URL inválida").optional(),
});

const ProjectFeatureSchema = z.object({
  title: z.string().min(1, "O título da feature é obrigatório").optional(),
  isFeature: z.boolean().optional(),
});

const LaunchInfoSchema = z.object({
  launchDate: z.string().optional(),
  marketCap: z.number().optional(),
  currentSupply: z.string().optional(),
  totalSupply: z.number().optional(),
  privateSale: z.number().optional(),
  publicSale: z.number().optional(),
});

const PartnershipSchema = z.object({
  type: z.string().optional(),
  link_url: z.string().url("URL da parceria inválida").optional(),
});

const Genre = z.object({
  name: z.string().optional(),
});

export const createPostSchema = z.object({
  title: z.string().min(1, "O título é obrigatório"),

  market_link: z.string().url("URL de mercado inválida").optional(),
  score: z.number().optional(),
  investment: z.string().optional(),
  token: z.string().optional(),
  network: z.string().optional(),
  comment_author: z.string().optional(),
  authorId: z.string().optional(),

  // Arrays e objetos opcionais
  genres: z.array(Genre).optional(),
  links: z.array(LinkSchema).optional(),
  projectFeatures: z.array(ProjectFeatureSchema).optional(),
  launchInfo: LaunchInfoSchema.optional(),
  partnerships: z.array(PartnershipSchema).optional(),
});
