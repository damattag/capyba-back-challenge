import { Router } from "express";
import { CommentController } from "../controllers";
import { auth, emailVerify } from "../middlewares";

const CommentRouter = Router();

CommentRouter.route("/")
  .post([auth, emailVerify], CommentController.create)
  .get([auth, emailVerify], CommentController.readAll);

CommentRouter.route("/:id")
  .get([auth, emailVerify], CommentController.read)
  .patch([auth, emailVerify], CommentController.update)
  .delete([auth, emailVerify], CommentController.delete);

CommentRouter.route("/user/:id").get(
  [auth, emailVerify],
  CommentController.readByUser,
);

CommentRouter.route("/post/:id").get(
  [auth, emailVerify],
  CommentController.readByPost,
);

export default CommentRouter;
