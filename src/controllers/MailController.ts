import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { randomUUID } from "node:crypto";

import { UserRepository } from "../repositories";
import { MailHandler, mailTemplate } from "../utils";

class MailController {
  async emailVerification(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;

      const user = await UserRepository.findByEmail(email);

      if (!user) {
        throw createHttpError(404, "Usuário não encontrado.");
      }

      const randomUuid = randomUUID();

      const token = randomUuid.slice(0, 6);

      const now = new Date();

      const tokenExpiration = new Date(now.setHours(now.getHours() + 1));

      await UserRepository.update(user.id, {
        emailVerifyToken: token,
        emailVerifyExpiry: tokenExpiration,
      });

      const options = {
        userName: user.name,
        subjectText: "Verificação de e-mail",
        html: mailTemplate(user.name, token),
        userEmail: user.email,
      };

      const mailResponse = await MailHandler(options);

      if (!mailResponse) {
        throw createHttpError(503, "Erro ao enviar e-mail.");
      }

      res.status(200).json({
        message: "E-mail enviado com sucesso.",
      });

      return next();
    } catch (error) {
      return next(error);
    }
  }
}

export default new MailController();
