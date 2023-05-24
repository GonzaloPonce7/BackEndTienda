import passport from "passport";
import local from "passport-local";
import { createHash, isValidPassword } from "../utils.js";
import GitHubStrategy from "passport-github2";
import GoogleStrategy from "passport-google-oauth2";
import { UsersRepository } from "../repository/usersRepository.js";
import { CartRepository } from "../repository/cartRepository.js";
import { addLogger } from "../logger/index.js";
import config from "../config/config.js";

const LocalStrategy = local.Strategy;
const usersRepository = new UsersRepository();
const cartRepository = new CartRepository();

const initPassport = () => {
  passport.use(
    "google",
    new GoogleStrategy(
      {
        clientID: config.clientIDGoogle,
        clientSecret: config.clientSecretGoggle,
        callbackURL: `http://localhost:${config.port}/sessions/googlecallback`,
        scope: ["email"],
        passReqToCallback: true,
      },
      async (request, accessToken, refreshToken, profile, done) => {
        console.log(profile);
        try {
          const newUser = await usersRepository.create(
            profile._json.email,
            "",
            profile._json.given_name,
            profile._json.family_name
          );

          if (!newUser) {
            const user = await usersRepository.getByUsername(profile._json.email);
            return done(null, user);
          }
          return done(null, newUser);
        } catch (error) {
          return done("Error al registrarse " + error);
        }
      }
    )
  );

  passport.use(
    "github",
    new GitHubStrategy(
      {
        clientID: config.clientIDGithub,
        clientSecret: config.clientSecretGithub,
        callbackURL: `http://localhost:${config.port}/sessions/githubcallback`,
        scope: ["user: email"],
      },
      async (accesToken, refreshToken, profile, done) => {        
        try {
          const newUser = await usersRepository.create(
            profile._json.email,
            "",
            profile._json.name,
            ""
          );

          if (!newUser) {
            const user = await usersRepository.getByUsername(profile._json.email);
            return done(null, user);
          }
          return done(null, newUser);
        } catch (error) {
          return done("Error al registrarse " + error);
        }
      }
    )
  );

  passport.use(
    "register",
    new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: "email",
      },
      async (req, username, password, done) => {
        const { first_name, last_name } = req.body;

        // Solucion nueva
        password = createHash(password);
        try {
          const newUser = await usersRepository.create(
            username,
            password,
            first_name,
            last_name
          );

          if (!newUser) {
            return done(null, false);
          }
          return done(null, newUser);
        } catch (error) {
          return done("Error al registrarse " + error);
        }
      }
    )
  );

  passport.use(
    "local",
    new LocalStrategy(
      { usernameField: "email" },
      async (username, password, done) => {
        const { email } = username;
        try {
          const user = await usersRepository.getByUsername(username);
          if (!user) {
            console.error("No existe el usuario");
            return done(null, false);
          }
          if (!isValidPassword(user, password)) {
            return done(null, false);
          }
          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user?._id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await usersRepository.getById(id);
    done(null, user);
  });
};

export { initPassport };
