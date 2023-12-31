import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import createHttpError from "http-errors";
import { UserRepository } from "../repositories";

export default async function auth(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const hasAuthCookie = req.cookies.accessToken;

    const authToken = req.headers.authorization;

    if (!authToken || !hasAuthCookie) {
      throw createHttpError(401, "Token não encontrado.");
    }

    if (authToken !== hasAuthCookie) {
      throw createHttpError(401, "Token inválido.");
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

    return next();
  } catch (error) {
    return next(error);
  }
}
