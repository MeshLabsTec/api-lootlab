import { z } from "zod";

const LinkSchema = z.object({
  url: z.string().optional(),
});

const ProjectFeatureSchema = z.object({
  title: z.string().optional(),
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
  name: z.string(),
});

export const createPostSchema = z.object({
  title: z.string().min(1, "O título é obrigatório"),
  category: z.enum(["NFT Jogos", "NFT Artes"]),
  market_link: z.string().optional(),
  score: z.number().optional(),
  investment: z.string().optional(),
  token: z.string().optional(),
  network: z.string().optional(),
  comment_author: z.string().optional(),
  authorId: z.string().optional(),

  // Arrays e objetos opcionais
  genres: z.array(Genre),
  links: z.array(LinkSchema).optional(),
  projectFeatures: z.array(ProjectFeatureSchema).optional(),
  launchInfo: LaunchInfoSchema.optional(),
  partnerships: z.array(PartnershipSchema).optional(),
});
