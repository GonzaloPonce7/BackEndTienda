import { Router } from "express";
import passport from 'passport'
import { UsersController } from "../controllers/UsersController.js";

const router = Router();
const usersController = new UsersController()

router.get('/logout', usersController.logout)

router.get('/githubcallback', passport.authenticate('github', {failureRedirect: '/sessions/login'}), usersController.gitLogin)

router.get('/googlecallback', passport.authenticate('google', {failureRedirect: '/sessions/login'}), usersController.googleLogin)

router.post('/login', passport.authenticate('local', {failureRedirect: '/sessions/login'}), usersController.localLogin)

router.post('/register', passport.authenticate('register', {failureRedirect: '/session/failregister'}), usersController.create)

export {router as sessionRouter}