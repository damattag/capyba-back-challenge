import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import createHttpError from "http-errors";

export default async function auth(
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

    return next();
  } catch (error) {
    return next(error);
  }
}
