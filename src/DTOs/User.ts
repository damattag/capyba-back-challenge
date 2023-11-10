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
  role: z
    .enum(["USER", "ADMIN"], {
      invalid_type_error: "O cargo deve ser USER ou ADMIN.",
    })
    .default("USER"),
});

export const UserUpdateSchema = UserSchema.partial()
  .omit({
    acceptedTerms: true,
    role: true,
  })
  .extend({
    password: z.string().optional(),
    newPassword: z
      .string()
      .min(8, {
        message: "A senha deve ter no mínimo 8 caracteres.",
      })
      .regex(/[a-z]/i, { message: "A senha deve ter pelo menos uma letra." })
      .regex(/[0-9]/, { message: "A senha deve ter pelo menos um número." })
      .optional(),
  })
  .refine(
    (data) => {
      if (!data.newPassword || !data.password) {
        return false;
      }
      return true;
    },
    { message: "Insira a senha para que a mesma possa ser alterada." },
  );

export const UserEmailVerificationSchema = z.object({
  email: z
    .string({ required_error: "O e-mail é obrigatório." })
    .email({ message: "O e-mail é inválido." }),
  token: z
    .string({ required_error: "O token é obrigatório." })
    .min(6, { message: "O token deve ter 6 caracteres." })
    .max(6, { message: "O token deve ter 6 caracteres." }),
});
