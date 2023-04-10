import passport from 'passport'
import local from 'passport-local'
import { createHash, isValidPassword } from "../utils.js";
import GitHubStrategy from 'passport-github2'
import GoogleStrategy from 'passport-google-oauth2'
import { UsersDao } from '../dao/daoMongo/UsersDao.js';
import { addLogger } from '../logger/index.js';
import config from '../config/config.js';

const LocalStrategy = local.Strategy
const usersDao = new UsersDao()

const initPassport = () => {

    passport.use('google', new GoogleStrategy(
        {
            clientID: config.clientIDGoogle,
            clientSecret: config.clientSecretGoggle,
            callbackURL: 'http://localhost:8080/sessions/googlecallback',
            passReqToCallback: true
        },
        async(request, accessToken, refreshToken, profile, done) => {
            console.log(profile);

            try {
                const user = await usersDao.find(profile._json.email)
                if(user) {
                    console.log('Usuario  existente');
                    return done(null, user)
                }

                const newUser = {
                    first_name: profile._json.given_name,
                    last_name: profile._json.family_name,
                    email: profile._json.email,
                    password: ''
                }
                const result = await usersDao.create(newUser)
                return done(null, result)
            } catch (error) {
                return done('Error de login con google' + error)
            }
        }
    ))

    passport.use('github', new GitHubStrategy(
        {
            clientID: config.clientIDGithub,
            clientSecret: config.clientSecretGithub,
            callbackURL: "http://localhost:8080/sessions/githubcallback",
            scope: ['user: email']
        },
        async( accesToken, refreshToken, profile, done ) => {
            console.log(profile); 

            try {
                const user = await usersDao.find(profile._json.email)
                if (user) {
                    console.log('Usuario existente');
                    return done(null, user);
                }

                const newUser = {
                    first_name: profile._json.name,
                    last_name: "",
                    email: profile._json.email,
                    password: ''
                }
                const result = await usersDao.create(newUser)
                return done(null, result)
            } catch (error) {
                return done('Error de logueo de github' + error)
            }
        }
    ))

    passport.use('register', new LocalStrategy(
        {
            passReqToCallback: true,
            usernameField: 'email'
        },
        async (req, username, password, done) => {
            const {first_name, last_name, email} = req.body
            try{
                const user = await usersDao.find(username)
                if(user) {
                    console.log('Usuario existente')
                    return done(null, false)
                }

                const newUser = {
                    first_name,
                    last_name,
                    email,
                    password: createHash(password)
                }
                const result = await usersDao.create(newUser)
                return done(null, result)
            } catch (error) {
                return done('Error al registrarse ' + error)
            }
        }
    ))

    passport.use('local', new LocalStrategy(
        {usernameField: 'email'},
        async(username, password, done) => {
            const { email } = req.body
            try {
                const user = await usersDao.find(username)
                if (!user) {
                    console.error("No existe el usuario")
                    return done(null, false)
                }
                if(!isValidPassword(user, password)) {
                    return done(null, false)
                }
                return done(null, user)

            } catch (err) {
                return done(err)
            }
        }
    ))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser (async (id, done) => {
        const user = await usersDao.findById(id)
        done(null, user)
    })
}

export { initPassport }