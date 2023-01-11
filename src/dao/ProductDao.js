import { productModel } from "./models/ProductModel.js";

class ProductDao {

  static async getAll() {
    return await productModel.find().lean().exec();
  }

  static async post(product) {
    return await productModel.create(product)
  }
}

export {ProductDao};