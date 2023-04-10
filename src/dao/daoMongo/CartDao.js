import {cartModel} from "../models/CartModel.js";

export class CartDao {
  static async getAll() {
    return await cartModel.find().lean().exec();
  }

  static async getById(id) {
    return await cartModel.findById(id).lean().exec();
  }

  static async modifyQuantity(cid, pid, quantity) {
    await cartModel.updateOne(
      {
        _id: cid,
      },
      {
        $set: {
          "products.$[p].quantity": quantity,
        },
      },
      { arrayFilters: [{ "p._id": pid }] }
    );
  }

  static async updateProducts(cid, products) {
    await cartModel.updateOne(
      {
        _id: cid,
      },
      {
        $set: {
          "products": products
        },
      }
    );
  }

  static async deleteById(id) {
    await cartModel.findByIdAndDelete(id).lean().exec();
  }

  static async deleteProductInCart(cid, pid) {
    await cartModel
      .findByIdAndUpdate(cid, { $pull: { _id: pid } })
      .lean()
      .exec();
  }

  static async deleteAllProducts(cid) {
    return await cartModel
      .findByIdAndUpdate(cid, { $set: { products: [] } })
      .lean()
      .exec();
  }

  static async createCart(cart) {
    return await cartModel.create(cart);
  }

  static async update(cart) {
    return await cartModel.replaceOne({_id: cart._id}, cart).lean().exec();
  }
}