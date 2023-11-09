import { Request, Response, NextFunction } from "express";
import { UserSchema, UserUpdateSchema } from "../DTO";
import { UserRepository } from "../repositories";
import createHttpError from "http-errors";

class UserController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = UserSchema.parse(req.body);

      if (!data.acceptedTerms) {
        throw createHttpError(400, "Você precisa aceitar os termos.");
      }

      const user = await UserRepository.create(data);

      res.status(201).json({
        data: user,
        message: "Usuário criado com sucesso.",
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

      const user = await UserRepository.update(id, data);

      if (!user) {
        throw createHttpError(404, "Usuário não encontrado.");
      }

      res.status(200).json({
        data: user,
        message: "Usuário atualizado com sucesso.",
      });

      return next();
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
