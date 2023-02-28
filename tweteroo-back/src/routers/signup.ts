import { Router } from "express";
import sigs from "../controllers/signup_controller.js";

const signinRouter = Router();
    signinRouter
        .post("/sign-up", sigs.signin )

export default signinRouter;