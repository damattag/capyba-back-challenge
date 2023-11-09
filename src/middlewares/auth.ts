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
      createHttpError(401, "Token não encontrado.");
    } else {
      const [, token] = authToken.split(" ");

      jwt.verify(token, process.env.JWT_SECRET as string);

      next();
    }
  } catch (error: any) {
    res.status(401).send({ error: error.message });
  }
}
