import { Router } from "express";
import { UserController } from "../controllers";
import { auth } from "../middlewares";

const UserRouter = Router();

UserRouter.route("/")
  .post(UserController.create)
  .get([auth], UserController.readAll);

UserRouter.route("/:id")
  .patch([auth], UserController.update)
  .get([auth], UserController.read)
  .delete([auth], UserController.delete);

UserRouter.route("/verify-email").patch([auth], UserController.verifyEmail);

export default UserRouter;
