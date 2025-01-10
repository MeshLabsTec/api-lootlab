import type { IPostRepository } from "@/repositories/interfaceRepository/IPostRepository";
import type { ICreatePost } from "../interfaces/ICreatePost";
import { uploadImageToR2 } from "@/lib/cloudflare";
import type { Prisma } from "@prisma/client";
import type { IUserRepository } from "@/repositories/interfaceRepository/IUserRepository";
import type { IGenreRepository } from "@/repositories/interfaceRepository/IGenreRepository";
import { generateSlug } from "@/utils/generateSlug";
import { TitleAlreadyExistError } from "../@erros/Post/TitleAlreadyExistError";
import { UserNotFoundError } from "../@erros/User/UserNotFoundError";
import { GenresRequiredError } from "../@erros/Post/GenresRequiredError";

export class CreatePostUseCase {
  constructor(
    private readonly postRepository: IPostRepository,
    private readonly userRepository: IUserRepository,
    private readonly genreRepository: IGenreRepository,
  ) {}

  async execute(data: ICreatePost) {
    // Verificar se o título já existe
    const postByTitle = await this.postRepository.findByTitle(data.title);
    if (postByTitle) {
      throw new TitleAlreadyExistError();
    }
    const findUser = await this.userRepository.findById(data.authorId);

    if (!findUser) {
      throw new UserNotFoundError();
    }

    // Processar gêneros apenas se fornecidos
    // Verificar se os gêneros foram fornecidos
    if (!data.genres || data.genres.length === 0) {
      throw new GenresRequiredError(); // Lançar erro caso não haja gêneros
    }

    // Processar gêneros
    const genres = await this.genreRepository.findMany();

    const existingGenres = genres.filter((genre) =>
      data.genres.some((dataGenre) => dataGenre.name === genre.name),
    );

    const newGenres = data.genres.filter(
      (dataGenre) => !genres.some((genre) => genre.name === dataGenre.name),
    );

    const connectGenres = existingGenres.map((genre) => ({ id: genre.id }));
    const createGenres = newGenres.map((genre) => ({ name: genre.name }));

    const genreRelations = {
      connect: connectGenres.length > 0 ? connectGenres : undefined,
      create: createGenres.length > 0 ? createGenres : undefined,
    };

    // Processar imagens apenas se fornecidas
    let images;
    if (data.images?.length) {
      const randow = Math.floor(Math.random() * 1000000);
      images = await Promise.all(
        data.images.map(async (imageBuffer) => {
          const uniqueKey = `post-${randow}`;
          try {
            const signedUrl = await uploadImageToR2(imageBuffer, uniqueKey);
            return { url: signedUrl };
          } catch (error) {
            throw new Error("Erro ao fazer upload da imagem");
          }
        }),
      );
    }

    // Criar o post com campos opcionais
    const slug = generateSlug(data.title);
    const createPostInput: Prisma.PostUncheckedCreateInput = {
      title: data.title,
      category: data.category,
      slug,
      // Campos opcionais
      authorId: data.authorId,
      market_link: data.market_link,
      score: data.score,
      investment: data.investment,
      token: data.token,
      network: data.network,
      comment_author: data.comment_author,
      // Relações opcionais
      links: data.links?.length ? { create: data.links } : undefined,
      ProjectFeatures: data.projectFeatures?.length
        ? { create: data.projectFeatures }
        : undefined,
      launchInfo: data.launchInfo ? { create: data.launchInfo } : undefined,
      partnerships: data.partnerships?.length
        ? { create: data.partnerships }
        : undefined,
      Image: images ? { create: images } : undefined,
      genres: genreRelations,
    };

    const post = await this.postRepository.create(createPostInput);
    return post;
  }
}
