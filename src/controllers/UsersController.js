import { UsersDao } from "../dao/daoMongo/UsersDao.js";

export class UsersController {

  getAll = async (req, res) => {
    const users = UsersDao.getAll();
    res.send({status:"success", payload: users})
  }
  
  logout = async (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        res.status(500).render("errors/error", { error: err });
      } else {
        res.redirect("/sessions/login");
        return res.send("Logout exitoso");
      }
    });
    res.redirect("/sessions/login");
  };

  localLogin = async (req, res) => {
    if (!req.user) return res.status(401).send("Invalid credentials");
    req.session.user = req.user;
    res.redirect("/api/products");
  };

  gitLogin = async (req, res) => {
    console.log("Callback: ", req.user);
    if (!req.user) return res.status(400).send("Invalid credentials");
    req.session.user = req.user;
    console.log(req.session);
    res.redirect("/api/products");
  };

  googleLogin = async (req, res) => {
    console.log("Callback Google: ", req.user);
    if (!req.user) return res.status(400).send("Invalid credentials");
    req.session.user = req.user;
    console.log(req.session);
    res.redirect("/api/products");
  };

  create = async (req, res) => {
    res.status(200).redirect("/sessions/login")//.redirect("/sessions/login");
  };
}