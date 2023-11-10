import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { isHttpError } from "http-errors";
import { JsonWebTokenError } from "jsonwebtoken";

const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = 500;
  let message = "Erro no servidor, tente novamente mais tarde.";

  if (err instanceof ZodError) {
    statusCode = 400;
    message = err.issues[0].message;
  }

  if (err instanceof JsonWebTokenError) {
    statusCode = 401;
    message = err.message;
  }

  if (isHttpError(err)) {
    statusCode = err.statusCode;
    message = err.message;
  }

  return res.status(statusCode).json({ message });
};

export default errorHandler;
