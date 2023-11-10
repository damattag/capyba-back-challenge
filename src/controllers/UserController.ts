import { Request, Response, NextFunction } from "express";
import { compare, hash } from "bcryptjs";
import createHttpError from "http-errors";

import {
  UserEmailVerificationSchema,
  UserPasswordResetSchema,
  UserSchema,
  UserUpdateSchema,
} from "../DTOs";
import { UserRepository } from "../repositories";

class UserController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = UserSchema.parse(req.body);

      if (!data.acceptedTerms) {
        throw createHttpError(400, "Você precisa aceitar os termos.");
      }

      const alreadyExistsUserWithSameEmail = await UserRepository.findByEmail(
        data.email,
      );

      if (alreadyExistsUserWithSameEmail) {
        throw createHttpError(
          400,
          "Já existe um usuário cadastrado com esse e-mail.",
        );
      }

      const hashedPassword = await hash(data.password, 6);

      const userWithHashedPassword = { ...data, password: hashedPassword };

      const user = await UserRepository.create(userWithHashedPassword);

      res.status(201).json({
        data: user,
        message: "Usuário criado com sucesso.",
      });

      return next();
    } catch (error) {
      next(error);
    }
  }

  async read(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const user = await UserRepository.findById(id);

      if (!user) {
        throw createHttpError(404, "Usuário não encontrado.");
      }

      res.status(200).json({
        data: user,
        message: "Usuário encontrado com sucesso.",
      });

      return next();
    } catch (error) {
      next(error);
    }
  }

  async readAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await UserRepository.findAll();

      res.status(200).json({
        data: users,
        message: "Usuários encontrados com sucesso.",
      });

      return next();
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data = UserUpdateSchema.parse(req.body);

      const userExists = await UserRepository.findById(id);

      if (!userExists) {
        throw createHttpError(404, "Usuário não encontrado.");
      }

      if (data.email) {
        const alreadyExistsUserWithSameEmail = await UserRepository.findByEmail(
          data.email,
        );

        if (alreadyExistsUserWithSameEmail) {
          throw createHttpError(
            400,
            "Já existe um usuário cadastrado com esse e-mail.",
          );
        }
      }

      if (data.password) {
        const isSamePassword = await compare(
          data.password,
          userExists.password,
        );

        if (!isSamePassword) {
          throw createHttpError(400, "A senha atual está incorreta.");
        }
      }

      if (data.newPassword === data.password) {
        throw createHttpError(400, "A senha nova deve ser diferente da atual.");
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { newPassword: _, ...dataWithoutNewPassword } = data;

      const newPassword = data.newPassword;

      const user = newPassword
        ? await UserRepository.update(id, {
            ...dataWithoutNewPassword,
            password: await hash(newPassword, 6),
          })
        : await UserRepository.update(id, dataWithoutNewPassword);

      res.status(200).json({
        data: user,
        message: "Usuário atualizado com sucesso.",
      });

      return next();
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const userExists = await UserRepository.findById(id);

      if (!userExists) {
        throw createHttpError(404, "Usuário não encontrado.");
      }

      const user = await UserRepository.delete(id);

      res.status(200).json({
        data: user,
        message: "Usuário deletado com sucesso.",
      });

      return next();
    } catch (error) {
      next(error);
    }
  }

  async verifyEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, token } = UserEmailVerificationSchema.parse(req.body);

      const user = await UserRepository.findByEmail(email);

      if (!user) {
        throw createHttpError(404, "Usuário não encontrado.");
      }

      if (user.emailVerified) {
        throw createHttpError(400, "O e-mail já foi verificado.");
      }

      const isTokenValid = user.emailVerifyToken === token;

      if (!isTokenValid) {
        throw createHttpError(400, "O token é inválido.");
      }

      if (!user.emailVerifyExpiry) {
        throw createHttpError(
          401,
          "Não foi solicitada uma verificação de e-mail para este usuário.",
        );
      }

      const now = new Date();

      const isTokenExpired = now > user.emailVerifyExpiry;

      if (isTokenExpired) {
        throw createHttpError(400, "O token expirou.");
      }

      const updatedUser = await UserRepository.update(user.id, {
        emailVerified: true,
        emailVerifyToken: null,
        emailVerifyExpiry: null,
      });

      res.status(200).json({
        data: updatedUser,
        message: "E-mail verificado com sucesso.",
      });

      return next();
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
