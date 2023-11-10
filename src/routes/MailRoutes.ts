import { Router } from "express";

import { MailController } from "../controllers";
import { auth } from "../middlewares";

const MailRouter = Router();

MailRouter.route("/email-verification").post(
  [auth],
  MailController.emailVerification,
);

export default MailRouter;
