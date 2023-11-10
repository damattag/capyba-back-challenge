import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";

import { UserRepository } from "../repositories";

export default async function adminVerify(
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

    const { id, role } = decoded;

    const user = await UserRepository.findById(id);

    if (!user) {
      throw createHttpError(404, "Usuário não encontrado.");
    }

    if (role !== "admin") {
      throw createHttpError(
        403,
        "Você não possui permissão para acessar este recurso.",
      );
    }

    return next();
  } catch (error) {
    next(error);
  }
}
