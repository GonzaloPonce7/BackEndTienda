import { ProductDao } from "../dao/ProductDao.js"

export class ProductRepository {

    constructor() {
        this.productDao = new ProductDao()
    }

    getById(id) {
        this.productDao.getById(id)
    }

    deleteById(id){
        this.productDao.deleteById(id)
    }

    create(product) {
        this.productDao.create(product)
    }

    getFiltered(filter, page, limit, sort) {
        this.productDao.getFiltered(filter, page, limit, sort)
    }

}
