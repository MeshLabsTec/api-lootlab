import { z } from "zod";

// Esquema para validação de um Link
const LinkSchema = z.object({
  url: z.string().url("URL inválida"),
});

// Esquema para validação de ProjectFeatures
const ProjectFeatureSchema = z.object({
  title: z.string().min(1, "O título da feature é obrigatório"),
  isFeature: z.boolean(),
});

// Esquema para validação de LaunchInfo
const LaunchInfoSchema = z.object({
  launchDate: z.string().min(1, "A data de lançamento é obrigatória"),
  marketCap: z.number().nonnegative("O market cap deve ser um número positivo"),
  currentSupply: z.string().min(1, "A oferta atual é obrigatória"),
  totalSupply: z
    .number()
    .positive("O total supply deve ser um número positivo"),
  privateSale: z
    .number()
    .nonnegative("O valor da venda privada deve ser positivo"),
  publicSale: z
    .number()
    .nonnegative("O valor da venda pública deve ser positivo"),
});

// Esquema para validação de Partnership
const PartnershipSchema = z.object({
  type: z.string().min(1, "O tipo da parceria é obrigatório").optional(),
  link_url: z.string().url("URL da parceria inválida"),
});

// Esquema principal para validação do Post
export const createPostSchema = z.object({
  title: z.string().min(1, "O título é obrigatório"),
  market_link: z.string().url("URL de mercado inválida"),
  score: z.number().optional(),
  investment: z.string().optional(),
  token: z.string().min(1, "O token é obrigatório"),
  network: z.string().min(1, "A rede é obrigatória"),
  authorId: z.string().min(1, "O ID do autor é obrigatório"),
  comment_author: z.string().min(1, "O comentário do autor é obrigatório"),
  links: z.array(LinkSchema).optional(),
  projectFeatures: z.array(ProjectFeatureSchema).optional(),
  launchInfo: LaunchInfoSchema,
  partnership: z.array(PartnershipSchema).optional(),
});
