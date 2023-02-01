import { Router } from "express";
import { usersModel } from "../dao/models/UsersModels.js";
import { createHash, isValidPassword, authToken, generateToken } from "../utils.js";
import passport from 'passport'


const router = Router();

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
    res.json({error: 'Failed login'}).render('sessions/faillogin')
})

//Vista par el fail register
router.get('/failregister', async(req, res) => {
    console.error('Failed Stragtregy');
    res.send({error: 'Failed'}).render('/sessions/failregister')
})

// Api de Logout
router.get('/logout', async (req, res) => {
    req.session.destroy(err => {
        if (err) {
            res.status(500).render('errors/error', { error: err })
        }else{
            res.redirect('/sessions/login')
            return res.send('Logout exitoso')
        }
    })
    res.redirect('/sessions/login')
})

// Api de Login
router.post('/login', passport.authenticate('login', '/session/faillogin'), async (req, res) => {
    if(!req.user) return res.status(401).send('Invalid credentials')
    req.session.user = req.user
    // const { email, password } = req.body;
    
    // if(!req.user) return res.status(400).send('Invalid credentials')
    // req.session.user = req.user
    
    // const user = await usersModel.findOne({email}).lean().exec()
    // if(!user) {
        //     return res.status(401).render('errors/base', { error: 'Error en username y/o password'})
        // }
        
    // if(!isValidPassword(user, password)) {
    //     return res.status(403).send('Incorrect Password')
    // }
    // delete user.password
    
    // req.session.user = user
    
    //req.session.user.rol = (username == 'admin') ? 'admin' : 'user'
    res.redirect('/')
})

router.get(
    '/login_github',
    passport.authenticate('github', {scope: ['user:email']}),
    async (req, res) => {
        res.render('sessions/login', {})
    }
)

router.get('/githubcallback', passport.authenticate('github', {failureRedirect: '/sessions/logins'}), async (req, res) => {
    console.log("Callback: ", req.user);
    if(!req.user) return res.status(400).send('Invalid credentials')
    req.session.user = req.user
    console.log(req.session);
    res.redirect('/products')
})

router.get(
    '/login_google',
    passport.authenticate('google', {scope: ['email', 'profile']}),
    async (req, res) => {
        res.render('sessions/login', {})
    }
)
    

router.get('/googlecallback', passport.authenticate('google', {failureRedirect: '/sessions/logins'}), async (req, res) => {
    console.log("Callback Google: ", req.user);
    if(!req.user) return res.status(400).send('Invalid credentials')
    req.session.user = req.user
    console.log(req.session);
    res.redirect('/products')
})

// Api para crear usuarios
router.post('/register', passport.authenticate('register', {failureRedirect: '/session/failregister'}), async (req, res) => {

    // const userData = req.body
    // userData.password = createHash(userData.password)

    // const user = new usersModel(userData);
    // await user.save();

    // req.session.user = user

    res.send('Se registro correctamente').redirect('/sessions/login')
})

export {router as sessionRouter}