import express from "express";
import { Router } from "express";
import { usersModel } from "../dao/models/UsersModels.js";

const router = Router();

// Vista de login
router.get('/login', async (req, res) => {
    res.render('sessions/login', {})
})

// Vista para registrar usuarios
router.get('/register', async (req, res) => {
    res.render('sessions/register', {})
})

// Api de Logout
router.get('/logout', async (req, res) => {
    req.session.destroy(err => {
        if (err) {
            res.status(500).render('errors/base', { error: err })
        }else{
            res.redirect('/sessions/login')
            return res.send('Logout exitoso')
        }
    })
    res.redirect('/sessions/login')
})

// Api de Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await usersModel.findOne({email, password}).lean().exec()
    if(!user) {
        return res.status(401).render('errors/base', { error: 'Error en username y/o password'})
    }

    req.session.user = user

    //req.session.user.rol = (username == 'admin') ? 'admin' : 'user'
    res.redirect('/')
})

// Api para crear usuarios
router.post('/create', async (req, res) => {
    const userNew = req.body

    const user = new usersModel(userNew);
    await user.save();

    res.redirect('/sessions/login')
})

export {router as sessionRouter}