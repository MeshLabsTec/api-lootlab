import { z } from "zod";

// Schema para links
const LinkSchema = z.object({
  url: z.string().url("A URL do link é inválida").optional(),
});

// Schema para recursos do projeto
const ProjectFeatureSchema = z.object({
  title: z.string().min(1, "O título da feature é obrigatório").optional(),
  isFeature: z.boolean().optional(),
});

// Schema para informações de lançamento
const LaunchInfoSchema = z.object({
  launchDate: z.string().optional(),
  marketCap: z
    .number()
    .min(0, "MarketCap deve ser um valor positivo")
    .optional(),
  currentSupply: z.string().optional(),
  totalSupply: z
    .number()
    .min(0, "TotalSupply deve ser um valor positivo")
    .optional(),
  privateSale: z
    .number()
    .min(0, "PrivateSale deve ser um valor positivo")
    .optional(),
  publicSale: z
    .number()
    .min(0, "PublicSale deve ser um valor positivo")
    .optional(),
});

// Schema para parcerias
const PartnershipSchema = z.object({
  type: z.string().min(1, "O tipo da parceria é obrigatório").optional(),
  link_url: z.string().url("A URL da parceria é inválida").optional(),
});

// Schema principal para a criação do post
export const createPostSchema = z.object({
  title: z.string().min(1, "O título é obrigatório"),
  category: z.enum(["NFT Jogos", "NFT Artes", "Crypto"], {
    message: "A categoria é inválida",
  }),
  marketLink: z.string().url("O link do mercado é inválido").optional(),
  score: z.number().min(0, "O score deve ser um valor positivo").optional(),
  investment: z.string().optional(),
  token: z.string().optional(),
  network: z.string().optional(),
  commentAuthor: z.string().optional(),
  authorId: z.string().optional(),

  // Arrays e objetos opcionais
  genres: z
    .array(
      z.object({
        name: z.string(),
      }),
    )
    .optional(),
  links: z.array(LinkSchema).optional(),
  projectFeatures: z.array(ProjectFeatureSchema).optional(),
  launchInfo: LaunchInfoSchema.optional(),
  partnerships: z.array(PartnershipSchema).optional(),
});
