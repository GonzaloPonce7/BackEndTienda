import { CartDao } from "../dao/daoMongo/CartDao.js";

export class CartRepository {
    constructor() {
        this.cartDao = new CartDao()
    }

    async getAll() {
        await this.cartDao.getAll()
    }

    async getById(cid) {
        await this.cartDao.getById(cid)
    }

    async createCart(cart) {
        await this.cartDao.createCart(cart)
    }

    async deleteById(cid) {
        await this.cartDao.deleteById(cid)
    }

    async deleteProductInCart(cid, pid) {
        await this.cartDao.deleteProductInCart(cid, pid)
    }

    async deleteAllProducts(cid) {
        await this.cartDao.deleteAllProducts(cid)
    }

    async updateProducts(cid, products) {
        await this.cartDao.updateProducts(cid, products)
    }

    async modifyQuantity() {
        await this.cartDao.modifyQuantity(cid, pid, quantity)
    }

    async update(cart) {
        await this.cartDao.update(cart)
    } 
}