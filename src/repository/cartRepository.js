import { CartDao } from "../dao/daoMongo/CartDao.js";
import { ProductDao } from "../dao/daoMongo/ProductDao.js";
// hacer metodo addProduct
export class CartRepository {
    constructor() {
        this.cartDao = new CartDao()
        this.productDao = new ProductDao()
    }

    async getAll() {
        return await this.cartDao.getAll()
    }

    async getById(cid) {
        return await this.cartDao.getById(cid)
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

    async modifyQuantity(cid, pid, quantity) {
        await this.cartDao.modifyQuantity(cid, pid, quantity)
    }
    
    async addProduct(cid, pid, quantity) {
        const cart = await this.cartDao.getById(cid)
        const product = await this.productDao.getById(pid)
        let quantityToRaise = quantity > 1? quantity : 1; 
        if(!product)
            return null
        const existingProduct = cart.products.find(p => p.productId == pid)
        if(existingProduct){
            let response =  await this.cartDao.modifyQuantity(cid, pid, quantityToRaise)
            return response
        }
        let productToAdd = {
            productId: pid,
            quantity: quantityToRaise,
        }
        return await this.cartDao.updateProducts(cid, productToAdd)
    }
    
    async create(cart) {
        return await this.cartDao.create(cart)
    }
    
    async update(cart) {
        await this.cartDao.update(cart)
    } 
}