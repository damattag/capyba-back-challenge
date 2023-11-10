import { Router } from "express";

import UserRouter from "./UserRoutes";
import AuthRouter from "./AuthRoutes";
import PostRouter from "./PostRoutes";
import MailRouter from "./MailRoutes";
import CommentRouter from "./CommetRoutes";

const router = Router();

router.use("/user", UserRouter);
router.use("/session", AuthRouter);
router.use("/post", PostRouter);
router.use("/mail", MailRouter);
router.use("/comment", CommentRouter);

router.get("/", (req, res) => {
  res.send("Made by damattag => https://github.com/damattag 😁✌️");
});

export default router;
