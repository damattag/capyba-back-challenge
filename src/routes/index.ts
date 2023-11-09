import { Router } from "express";
import UserRouter from "./UserRoutes";
import AuthRouter from "./AuthRoutes";
import PostRouter from "./PostRoutes";

const router = Router();

router.use("/user", UserRouter);
router.use("/session", AuthRouter);
router.use("/post", PostRouter);

router.get("/", (req, res) => {
  res.send("Made by damattag => https://github.com/damattag 😁✌️");
});

export default router;
