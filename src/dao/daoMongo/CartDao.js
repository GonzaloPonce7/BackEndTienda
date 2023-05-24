import {cartModel} from "../models/CartModel.js";

export class CartDao {
  async getAll() {
    return await cartModel.find().lean().exec();
  }

  async getById(id) {
    return await cartModel.findById(id).lean().exec();
  }

  async modifyQuantity(cid, pid, quantity) {
    return await cartModel.updateOne(
      {
        _id: cid,
      },
      {
        $inc: {
          "products.$[e].quantity": quantity,
        },
      },
      { arrayFilters: [{ "e.productId": pid }] }
    );
  }

  async updateProducts(cid, product) {
    return await cartModel.updateOne(
      {
        _id: cid,
      },
      {
        $push: {
          products: product
        }
      });
  }

  async deleteById(id) {
    await cartModel.findByIdAndDelete(id).lean().exec();
  }

  async deleteProductInCart(cid, pid) {
    await cartModel
      .findByIdAndUpdate(cid, { $pull: { productId: pid } })
      .lean()
      .exec();
  }

  async deleteAllProducts(cid) {
    return await cartModel
      .findByIdAndUpdate(cid, { $set: { products: [] } })
      .lean()
      .exec();
  }

  async create(cart) {
    const newCart = await cartModel.create(cart);
    return newCart._id
  }

  async update(cart) {
    return await cartModel.replaceOne({_id: cart._id}, cart).lean().exec();
  }
}