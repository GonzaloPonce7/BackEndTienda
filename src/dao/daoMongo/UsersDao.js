import { usersModel } from "../models/UsersModels.js";

export class UsersDao {

  async getAll() {
    return await usersModel.find().lean().exec()
  };

  async find(username) {
    return await usersModel.findOne({email: username}).lean().exec()
  };

  async create(user) {
    return await usersModel.create(user)
  };

  async findById(id) {
    return await usersModel.findById(id)
  };

  async findByCartId(cid) {
    return await usersModel.findOne({cartId: cid}).lean().exec()
  };
}