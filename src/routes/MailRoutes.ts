import { Router } from "express";

import { MailController } from "../controllers";

const MailRouter = Router();

MailRouter.route("/email-verification").post(MailController.emailVerification);

export default MailRouter;
