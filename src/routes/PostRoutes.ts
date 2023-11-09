import { Router } from "express";
import { PostController } from "../controllers";

const PostRouter = Router();

PostRouter.route("/").post(PostController.create).get(PostController.readAll);

PostRouter.route("/:id")
  .get(PostController.read)
  .patch(PostController.update)
  .delete(PostController.delete);

PostRouter.route("/user/:id").get(PostController.readByUser);

export default PostRouter;
