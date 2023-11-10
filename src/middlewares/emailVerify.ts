import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import createHttpError from "http-errors";

import { UserRepository } from "../repositories";

export default async function emailVerify(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const authToken = req.headers.authorization;

    if (!authToken) {
      throw createHttpError(401, "Token não encontrado.");
    }

    const decoded = jwt.verify(authToken, process.env.JWT_SECRET as string);

    if (typeof decoded === "string") {
      throw createHttpError(401, "Token inválido.");
    }

    const { id } = decoded;

    const user = await UserRepository.findById(id);

    if (!user) {
      throw createHttpError(401, "Sem autorização.");
    }

    if (!user.emailVerified) {
      throw createHttpError(
        403,
        "E-mail não verificado, por favor verifique seu e-mail",
      );
    }

    return next();
  } catch (error) {
    return next(error);
  }
}
