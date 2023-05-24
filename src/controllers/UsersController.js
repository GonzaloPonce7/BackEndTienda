import { UsersRepository } from "../repository/usersRepository.js";
import { addLogger } from '../logger/index.js';


export class UsersController {

  constructor() {
    this.usersRepository = new UsersRepository()
  }

  getAll = async (req, res) => {
    const users = this.usersRepository.getAll();
    res.send({status:"success", data: users})
  }
  
  logout = async (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        res.status(500).render("errors/error", { error: err });
      } else {
        res.redirect("/login");
        return res.send("Logout exitoso");
      }
    });
    res.redirect("/login");
  };

  localLogin = async (req, res) => {
    if (!req.user) return res.status(401).send("Invalid credentials");
    req.session.user = req.user;
    console.log("El rol del user es " + req.session.user.role);
    res.redirect("/");
  };

  gitLogin = async (req, res) => {
    console.log("Callback: ", req.user);
    if (!req.user) return res.status(400).send("Invalid credentials");
    req.session.user = req.user;
    console.log(req.session);
    res.redirect("/products");
  };

  googleLogin = async (req, res) => {
    console.log("Callback Google: ", req.user);
    if (!req.user) return res.status(400).send("Invalid credentials");
    req.session.user = req.user;
    console.log(req.session);
    res.redirect("/products");
  };

  deleteByUsername = async (req, res) => {
    let userName = req.body.email
    try {
      const deleteResponse = await this.usersRepository.deleteByUsername(userName)
      if(deleteResponse){
        res.status(200).send("Usuario borrado")
      } else {
        res.status(400).send("No se borro por que no se encontro el usuario")
      }
    } catch (error) {
      addLogger.error(error.message);
      res.status(500).send("Internal error")
    }
  }

  updateRole = async (req, res) => {
    let userName = req.body.email
    let userRole = req.body.role
    if(!["admin", "user", "premium"].contains(userRole)) {
      res.status(400).send("Rol no permitido")
    }
    try {
      const userUpdated = await this.usersRepository.updateRole(userName,userRole)
      if(userUpdated) {
        res.status(200).send("Rol actualizado")
      } else {
        res.status(400).send("No se actualizo por que no se encontro el usuario")
      }
  
    } catch (error) {
      addLogger.error(error.message);
      res.status(500).send("Internal error")
    }
  }

  deleteteOldUsers = async (req, res) => {
    const response = await this.usersRepository.deleteOldUsers()
    if(response) {
      res.status(200).send('Usuarios borrados')
    } else {
      res.status(200).send('No se borraron usuarios')
    }
  }

  create = async (req, res) => {
    res.status(200).redirect("/login")
  };
}