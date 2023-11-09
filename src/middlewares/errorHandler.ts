import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { isHttpError } from "http-errors";

const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = 500;
  let message = "Internal Server Error";

  if (err instanceof ZodError) {
    statusCode = 400;
    message = err.issues[0].message;
  }

  if (isHttpError(err)) {
    statusCode = err.statusCode;
    message = err.message;
  }

  return res.status(statusCode).json({ message });
};

export default errorHandler;
