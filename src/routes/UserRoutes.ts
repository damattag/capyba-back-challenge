import { Router } from "express";
import { UserController } from "../controllers";

const UserRouter = Router();

UserRouter.route("/").post(UserController.create);

UserRouter.route("/:id")
  .patch(UserController.update)
  .get(UserController.read)
  .delete(UserController.delete);

export default UserRouter;
