import { productModel } from "../models/ProductModel.js";

export class ProductDao {
  async getAll() {
    return await productModel.find().lean().exec();
  }

  async getFiltered(filter = {}, page = 1, limit = 10, sort = 'asc') {
    const options = {
      sort: { price: sort == 'desc' ? -1 : 1 },
      lean: true,
      page: page,
      limit: limit,
    };
    
    const result = await productModel.paginate(filter, options);

    return result.docs;
  }

  async getById(id) {
    return await productModel.findById(id).lean().exec();
  }

  async deleteById(id) {
    return await productModel.findByIdAndDelete(id).lean().exec();
  }

  async deleteByTitle(title) {
    return await productModel.deleteOne({ Title: title }).lean().exec();
  }

  async update(product) {
    return await productModel.replaceOne({_id: product._id}, product).lean().exec();
  }

  async create(product) {
    return await productModel.create(product);
  }
}