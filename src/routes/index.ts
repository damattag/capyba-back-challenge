import { Router } from "express";
import UserRouter from "./UserRoutes";

const router = Router();

router.use("/user", UserRouter);

router.get("/", (req, res) => {
  res.send("Made by damattag 😁✌️");
});

export default router;
