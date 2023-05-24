import { ProductDao } from "../dao/daoMongo/ProductDao.js"

export class ProductRepository {

    constructor() {
        this.productDao = new ProductDao()
    }

    async getById(id) {
        return await this.productDao.getById(id)
    }

    async deleteById(id){
        return await this.productDao.deleteById(id)
    }

    async create(product) {
        return await this.productDao.create(product)
    }

    async update(product) {
        return await this.productDao.update(product)
    } 

    async getFiltered(filter, page, limit, sort) {
        return await this.productDao.getFiltered(filter, page, limit, sort)
    }

}
