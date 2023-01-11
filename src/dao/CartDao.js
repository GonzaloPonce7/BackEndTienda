import CartModel from "./models/CartModel.js";

class CartDao {

    static async getAll() {
        return await CartModel.find().lean().exec();
    }

    static async post(cart) {
        return await CartModel.create(cart)
    }
}

export { CartDao }