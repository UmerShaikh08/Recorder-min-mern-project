import { Router } from "express";
import UserAuth, { UserDetails } from "../controllers/UserAuth.js";

const userRouter = Router();
userRouter.post("/Authentication", UserAuth);
userRouter.post("/user-details", UserDetails);

export default userRouter;
