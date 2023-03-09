import { productModel } from "./models/ProductModel.js";

class ProductDao {
  static async getAll() {
    return await productModel.find().lean().exec();
  }

  static async getFiltered(filter = {}, page = 1, limit = 10, sort = 'asc') {
    const options = {
      sort: { price: sort == 'desc' ? -1 : 1 },
      lean: true,
      page: page,
      limit: limit,
    };
    return await productModel.paginate(filter, options);
  }

  static async getById(id) {
    return await productModel.findById(id).lean().exec();
  }

  static async deleteById(id) {
    return await productModel.findByIdAndDelete(id).lean().exec();
  }
  static async deleteByTitle(title) {
    return await productModel.deleteOne({ Title: title }).lean().exec();
  }

  static async create(product) {
    return await productModel.create(product);
  }
}

export { ProductDao };