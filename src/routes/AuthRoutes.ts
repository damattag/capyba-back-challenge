import { Router } from "express";
import { AuthController } from "../controllers";

const AuthRouter = Router();

AuthRouter.route("/").post(AuthController.login).delete(AuthController.logout);

export default AuthRouter;
