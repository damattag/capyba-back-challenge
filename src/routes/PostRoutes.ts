import { Router } from "express";
import { PostController } from "../controllers";
import { auth } from "../middlewares";

const PostRouter = Router();

PostRouter.route("/")
  .post([auth], PostController.create)
  .get([auth], PostController.readAll);

PostRouter.route("/:id")
  .get([auth], PostController.read)
  .patch([auth], PostController.update)
  .delete([auth], PostController.delete);

PostRouter.route("/user/:id").get([auth], PostController.readByUser);

export default PostRouter;
