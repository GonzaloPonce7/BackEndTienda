import { UsersDao } from "../dao/daoMongo/UsersDao.js";
import { CartDao } from "../dao/daoMongo/CartDao.js";
import { Mail } from "../services/mail.js";
import { createHash, isValidPassword } from "../utils.js";

export class UsersRepository {
  constructor() {
    this.cartDao = new CartDao();
    this.usersDao = new UsersDao();
    this.mail = new Mail();
  }

  async getAll() {
    return await this.usersDao.getAll();
  }

  async getById(id) {
    return await this.usersDao.getById(id);
  }

  async getByUsername(userName) {
    return await this.usersDao.getByUsername(userName);
  }

  async getByCartId(cid) {
    return await this.usersDao.getByCartId(cid);
  }

  async deleteByUsername(userName) {
    return await this.usersDao.deleteOne(userName);
  }

  async deleteOldUsers() {
    const deletedUsers = await this.usersRepository.deleteOldUsers();
    addLogger.info(deletedUsers);

    if (deletedUsers && deletedUsers.length >= 0) {
      let html = `<h1>Notificacion de baja de cuenta</h1>`;

      deletedUsers.forEach(async (e) => {
        html = html.concat(
          `<h2>${e.email}</h2><p>Se borro tu cuenta por inactividad en los ultimops 2 dias. Vuelva Prontos</p>`
        );
        await this.mail.send(user, "Baja de cuenta por inactividad", html);
      });

      return true;
    } else {
      return false;
    }
  }

  async sessionUpdater(userName, date) {
    await this.usersDao.update(userName, { sessionDate: date });
  }

  async updateRole(userName, userRole) {
    return await this.usersDao.update(userName, { role: userRole });
  }

  async create(email, password, first_name, last_name) {
    const user = await this.usersDao.getByUsername(email);
    if (user) return null;

    const cartId = await this.cartDao.create();
    const newUser = {
      first_name,
      last_name,
      email,
      cartId: cartId,
      sessionDate: new Date(),
      password: password,
    };
    return await this.usersDao.create(newUser);
  }
}
