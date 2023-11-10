import { Router } from "express";
import { PostController } from "../controllers";
import { adminVerify, auth, emailVerify } from "../middlewares";

const PostRouter = Router();

PostRouter.route("/")
  .post([auth, emailVerify, adminVerify], PostController.create)
  .get([auth], PostController.readAll);

PostRouter.route("/:id")
  .get([auth], PostController.read)
  .patch([auth, emailVerify, adminVerify], PostController.update)
  .delete([auth, emailVerify, adminVerify], PostController.delete);

PostRouter.route("/user/:id").get([auth], PostController.readByUser);

export default PostRouter;
