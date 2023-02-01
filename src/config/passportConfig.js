import passport from 'passport'
import local from 'passport-local'
import { createHash, isValidPassword } from "../utils.js";
import { usersModel } from '../dao/models/UsersModels.js';
import GitHubStrategy from 'passport-github2'
import GoogleStrategy from 'passport-google-oauth2'

const LocalStrategy = local.Strategy

const initPassport = () => {

    passport.use('google', new GoogleStrategy(
        {
            clientID: '27281791633-dc0bt9nqc9o2riajien1uvchgbk2clac.apps.googleusercontent.com',
            clientSecret: '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',
            callbackURL: 'http://localhost:8080/sessions/googlecallback',
            passReqToCallback: true
        },
        async(request, accessToken, refreshToken, profile, done) => {
            console.log(profile);

            try {
                const user = await usersModel.findOne({email: profile._json.email})
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
                const result = await usersModel.create(newUser)
                return done(null, result)
            } catch (error) {
                return done('Error de login con google' + error)
            }
        }
    ))

    passport.use('github', new GitHubStrategy(
        {
            clientID: "Iv1.a78369e0858dcb88",
            clientSecret: "de5a7d01ce6361079c9a3ddd5977d4f4fedc2ab4",
            callbackURL: "http://localhost:8080/sessions/githubcallback",
            scope: ['user: email']
        },
        async( accesToken, refreshToken, profile, done ) => {
            console.log(profile); 

            try {
                const user = await usersModel.findOne({email: profile._json.email})
                if (user) {
                    console.log('Usuario existente');
                    return done
                }

                const newUser = {
                    first_name: profile._json.name,
                    last_name: "",
                    email: profile._json.email,
                    password: ''
                }
                const result = await usersModel.create(newUser)
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
                const user = await usersModel.findOne({email: username})
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
                const result = await usersModel.create(newUser)
                return done(null, result)
            } catch (error) {
                return done('Error al registrarse ' + error)
            }
        }
    ))

    passport.use('login', new LocalStrategy(
        {usernameField: 'email'},
        async(username, password, done) => {
            const { email } = req.body
            try {
                const user = await usersModel.findOne({email: username}).lean().exec()
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
        const user = await usersModel.findById(id)
        done(null, user)
    })
}

export { initPassport }