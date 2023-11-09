import { Router } from "express";
import UserRouter from "./UserRoutes";
import AuthRouter from "./AuthRoutes";

const router = Router();

router.use("/user", UserRouter);
router.use("/session", AuthRouter);

router.get("/", (req, res) => {
  res.send("Made by damattag 😁✌️");
});

export default router;
