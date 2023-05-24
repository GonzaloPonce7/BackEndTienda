import { Router } from "express";
import passport from "passport";
import { UsersController } from "../controllers/UsersController.js";


const router = Router();
const usersController = new UsersController();


router.get("/logout", usersController.logout);

router.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  usersController.gitLogin
);

router.get(
  "/googlecallback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  usersController.googleLogin
);

router.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/login" }),
  usersController.localLogin
);

router.post(
  "/register",
  passport.authenticate("register", {
    failureRedirect: "/failregister",
  }),
  usersController.create
);

export { router as sessionRouter };