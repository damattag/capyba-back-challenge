import { z } from "zod";

export const CommentSchema = z.object({
  content: z.string({ required_error: "O conteúdo é obrigatório." }),
  authorId: z.string({ required_error: "O id do autor é obrigatório." }),
  postId: z.string({ required_error: "O id do post é obrigatório." }),
  commentParentId: z
    .string({
      required_error: "O id do comentário pai é obrigatório.",
    })
    .optional(),
});

export const CommentUpdateSchema = CommentSchema.partial().omit({
  authorId: true,
  postId: true,
  commentParentId: true,
});

export const CommentGetSchema = z.object({
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
  isEdited: z
    .boolean({
      invalid_type_error: "O status de edição deve ser um booleano.",
    })
    .optional(),
  orderField: z
    .enum(
      [
        "content",
        "authorId",
        "postId",
        "commentParentId",
        "edited",
        "id",
        "createdAt",
      ],
      {
        invalid_type_error:
          "O campo de ordenação deve ser 'content', 'authorId', 'postId', 'commentParentId', 'edited', 'id', 'createdAt'.",
      },
    )
    .optional(),
  order: z
    .enum(["asc", "desc"], {
      invalid_type_error: "A ordenação deve ser 'asc' ou 'desc'.",
    })
    .optional(),
});
