import { z } from "zod";

export const PostSchema = z.object({
  title: z.string({ required_error: "O título é obrigatório." }),
  content: z.string({ required_error: "O conteúdo é obrigatório." }),
  authorId: z.string({ required_error: "O id do autor é obrigatório." }),
  published: z
    .boolean({
      required_error: "O status de publicação é obrigatório.",
      invalid_type_error: "O status de publicação deve ser um booleano.",
    })
    .default(false),
});

export const PostUpdateSchema = PostSchema.partial().omit({
  authorId: true,
  published: true,
});

export const PostGetSchema = z.object({
  search: z
    .string({ invalid_type_error: "O título deve deve ser um texto." })
    .optional(),
  page: z.coerce
    .number({ invalid_type_error: "A página deve deve ser um número." })
    .int({ message: "A página deve ser um número inteiro." })
    .min(1, { message: "A página deve ser maior que 0." })
    .default(1),
  limit: z.coerce
    .number({ invalid_type_error: "O limite deve deve ser um número." })
    .int({ message: "O limite deve ser um número inteiro." })
    .min(1, { message: "O limite deve ser maior que 0." })
    .default(5),
  isDraft: z
    .boolean({
      invalid_type_error: "O status de publicação deve ser um booleano.",
    })
    .optional(),
  orderField: z
    .enum(
      [
        "id",
        "createdAt",
        "updatedAt",
        "title",
        "content",
        "published",
        "authorId",
      ],
      {
        invalid_type_error:
          "O campo de ordenação deve ser 'id', 'createdAt', 'updatedAt', 'title', 'content', 'published' ou 'authorId'.",
      },
    )
    .optional(),
  order: z
    .enum(["asc", "desc"], {
      invalid_type_error: "A ordenação deve ser 'asc' ou 'desc'.",
    })
    .optional(),
});
