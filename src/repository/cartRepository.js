import { CartDao } from "../dao/CartDao.js";

export class CartRepository {
    constructor() {
        this.cartDao = new CartDao()
    }

    getAll() {
        this.cartDao.getAll()
    }

    getById(cid) {
        this.cartDao.getById(cid)
    }

    createCart(cart) {
        this.cartDao.createCart(cart)
    }

    deleteById(cid) {
        this.cartDao.deleteById(cid)
    }

    deleteProductInCart(cid, pid) {
        this.cartDao.deleteProductInCart(cid, pid)
    }

    deleteAllProducts(cid) {
        this.cartDao.deleteAllProducts(cid)
    }

    updateProducts(cid, products) {
        this.cartDao.updateProducts(cid, products)
    }

    modifyQuantity() {
        this.cartDao.modifyQuantity(cid, pid, quantity)
    }
}