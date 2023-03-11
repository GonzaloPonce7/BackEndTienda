import { Router } from "express";
import passport from 'passport'
import { UsersController } from "../controllers/UsersController.js";

const router = Router();
const usersController = new UsersController()

// Vista de login
router.get('/login', async (req, res) => {
    res.render('sessions/login', {})
})

// Vista para registrar usuarios
router.get('/register', async (req, res) => {
    res.render('sessions/register', {})
})

//Vista para fail log
router.get('/faillogin', (req, res) => {
    res.status(400).render('sessions/faillogin')
})

//Vista par el fail register
// router.get('/failregister', async(req, res) => {
//     console.error('Failed Stragtregy');
//     res.status(400).render('sessions/failregister')
// })

router.get(
    '/login_google',
    passport.authenticate('google', {scope: ['email', 'profile']}),
    async (req, res) => {
        res.render('sessions/login', {})
    }
)

router.get(
    '/login_github',
    passport.authenticate('github', {scope: ['user:email']}),
    async (req, res) => {
        res.render('sessions/login', {})
    }
)

router.get('/logout', usersController.logout)

router.get('/githubcallback', passport.authenticate('github', {failureRedirect: '/sessions/login'}), usersController.gitLogin)

router.get('/googlecallback', passport.authenticate('google', {failureRedirect: '/sessions/login'}), usersController.googleLogin)

router.post('/login', passport.authenticate('local', {failureRedirect: '/sessions/login'}), usersController.localLogin)

router.post('/register', passport.authenticate('register', {failureRedirect: '/sessions/failregister'}), usersController.create)

export {router as sessionRouter}