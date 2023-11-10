import { Router } from "express";
import { CommentController } from "../controllers";
import { auth } from "../middlewares";

const CommentRouter = Router();

CommentRouter.route("/")
  .post([auth], CommentController.create)
  .get([auth], CommentController.readAll);

CommentRouter.route("/:id")
  .get([auth], CommentController.read)
  .patch([auth], CommentController.update)
  .delete([auth], CommentController.delete);

CommentRouter.route("/user/:id").get([auth], CommentController.readByUser);

CommentRouter.route("/post/:id").get([auth], CommentController.readByPost);

export default CommentRouter;
