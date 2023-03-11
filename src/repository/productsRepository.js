import { ProductDao } from "../dao/ProductDao.js"

export class ProductRepository {

    constructor() {
        this.productDao = new ProductDao()
    }

    async getById(id) {
        await this.productDao.getById(id)
    }

    async deleteById(id){
        await this.productDao.deleteById(id)
    }

    async create(product) {
        await this.productDao.create(product)
    }

    async update(product) {
        await this.productDao.update(product)
    } 

    async getFiltered(filter, page, limit, sort) {
        await this.productDao.getFiltered(filter, page, limit, sort)
    }

}
