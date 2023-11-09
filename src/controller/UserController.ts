import { Request, Response, NextFunction } from "express";
import { UserSchema } from "../DTO";
import { UserRepository } from "../repositories";

class UserController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = UserSchema.parse(req.body);

      if (!data.acceptedTerms) {
        return res.status(400).json({ message: 'Os termos são obrigatórios.' });
      }

      const user = await UserRepository.create(data);

      return res.status(201).json({
        data: user,
        message: 'Usuário criado com sucesso.',
      });

    } catch (error) {
      console.log(error);
    }
  }
}

export default new UserController();