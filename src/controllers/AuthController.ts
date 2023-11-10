import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";

import { UserRepository } from "../repositories";
import { compare } from "bcryptjs";

class AuthController {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      const user = await UserRepository.findByEmail(email);

      if (!user) {
        throw createHttpError(400, "Login e/ou senha incorretos.");
      }

      const isPasswordValid = await compare(password, user.password);

      if (!isPasswordValid) {
        throw createHttpError(400, "Login e/ou senha incorretos.");
      }

      const accessToken = jwt.sign(
        {
          id: user.id,
          role: user.role,
        },
        process.env.JWT_SECRET as string,
        {
          expiresIn: "1d",
        },
      );

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _, ...loggedUser } = user;

      res.status(200).json({
        data: {
          user: loggedUser,
          accessToken,
        },
      });

      return next();
    } catch (error) {
      next(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      delete req.headers.authorization;

      res.status(204).json({
        message: "Logout realizado com sucesso.",
      });

      return next();
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
