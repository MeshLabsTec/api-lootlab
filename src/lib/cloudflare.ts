import { env } from "@/env";
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";

export const r2 = new S3Client({
  region: "auto",
  endpoint: env.CLOUDFLARE_ENDPOINT,
  credentials: {
    accessKeyId: env.CLOUDFLARE_ACCESS_KEY_ID,
    secretAccessKey: env.CLOUDFLARE_SECRET_ACCESS_KEY,
  },
});

/**
 * Upload uma imagem para o R2 e retorna o link público.
 * @param imageBuffer Buffer da imagem
 * @param key Nome único para a imagem no bucket
 * @param contentType Tipo de conteúdo (ex.: "image/png")
 * @returns URL pública da imagem
 */
export async function uploadImageToR2(
  imageBuffer: Buffer,
  key: string,
  contentType: string = "image/png",
): Promise<string> {
  const bucketName = env.CLOUDFLARE_BUCKET_NAME;

  try {
    const response = await r2.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: key,
        Body: imageBuffer,
        ContentType: contentType,
      }),
    );

    if (
      !response.$metadata.httpStatusCode ||
      response.$metadata.httpStatusCode >= 300
    ) {
      throw new Error(
        `Falha ao fazer upload: ${response.$metadata.httpStatusCode}`,
      );
    }
    const publicUrl = `${env.CLOUDFLARE_PUBLIC_ENDPOINT}/${key}`;
    return publicUrl;
  } catch (error) {
    throw new Error("Erro ao fazer upload da imagem: " + error.message);
  }
}

export async function deleteImageFromR2(url?: string): Promise<void> {
  // Se não houver URL, retorna sem fazer nada
  if (!url) {
    return;
  }

  try {
    // Verifica se a URL contém o endpoint público do Cloudflare
    if (!url.includes(env.CLOUDFLARE_PUBLIC_ENDPOINT)) {
      return;
    }

    const key = url.replace(`${env.CLOUDFLARE_PUBLIC_ENDPOINT}/`, "");

    await r2.send(
      new DeleteObjectCommand({
        Bucket: env.CLOUDFLARE_BUCKET_NAME,
        Key: key,
      }),
    );
  } catch (error) {
    // Tipagem explícita do erro
    const err = error as Error;
    throw new Error("Erro ao deletar imagem: " + err.message);
  }
}
