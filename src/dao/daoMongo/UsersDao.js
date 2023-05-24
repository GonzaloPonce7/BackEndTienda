import { usersModel } from "../models/UsersModels.js";

const TIEMPO_MAX = 3 * 24 * 60 * 60 * 1000;

export class UsersDao {

  async getAll() {
    return await usersModel.find().lean().exec()
  };

  async getByUsername(userName) {
    return await usersModel.findOne({email: userName}).lean().exec()
  };
  
  async getById(id) {
    return await usersModel.findById(id)
  };

  async deleteOldUsers() {
      let fechaActual = new Date();
      let fechaHaceDosDias = new Date(fechaActual.getTime() - TIEMPO_MAX);

      let oldUsers = await usersModel.find({sessionDate: { $lt: fechaHaceDosDias }}).lean().exec()

      await usersModel.deleteMany({sessionDate: { $lt: fechaHaceDosDias }}).lean().exec()

      return oldUsers
  }

  async getByCartId(cid) {
    return await usersModel.findOne({cartId: cid}).lean().exec()
  };

  async create(user) {
    return await usersModel.create(user)
  };
  
  async deleteByUsername(userName) {
    const result = await usersModel.deleteOne({ email: userName }).lean().exec();
    return result.deletedCount > 0 
  }

  async update(userName, props) {
    const result = await usersModel.updateOne({email: userName}, {$set: props}).lean().exec();
    return result.modifiedCount > 0 
  }
}
