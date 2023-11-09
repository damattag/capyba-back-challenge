import { z } from "zod";

export const UserSchema = z.object({
  name: z.string({ required_error: "O nome é obrigatório." }),
  email: z
    .string({ required_error: "O e-mail é obrigatório." })
    .email({ message: "O e-mail é inválido." }),
  password: z
    .string({ required_error: "A senha é obrigatória." })
    .min(8, { message: "A senha deve ter no mínimo 8 caracteres." })
    .regex(/[a-z]/i, { message: "A senha deve ter pelo menos uma letra." })
    .regex(/[0-9]/, { message: "A senha deve ter pelo menos um número." }),
  image: z.string({ required_error: "A imagem é obrigatória." }),
  acceptedTerms: z.boolean({ required_error: "Os termos são obrigatórios." }),
  role: z.enum(["USER", "ADMIN"]).default("USER"),
});

export const UserUpdateSchema = UserSchema.partial().omit({
  password: true,
  acceptedTerms: true,
  role: true,
});
