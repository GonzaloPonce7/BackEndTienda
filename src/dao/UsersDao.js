import { usersModel } from "./models/UsersModels.js";

export class UsersDao {

  async find(username) {
    return await usersModel.findOne({email: username}).lean().exec()
  }

  async create(user) {
    return await usersModel.create(user)
  }

  async findById(id) {
    return await usersModel.findById(id)
  }

  async findByCartId(cid) {
    return await usersModel.findOne({cart: cid}).lean().exec()
  }
}