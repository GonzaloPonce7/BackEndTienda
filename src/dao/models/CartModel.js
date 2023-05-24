import mongoose from "mongoose";

const CartCollection = 'carts'

const CartSchema = new mongoose.Schema({
    //_id: { type: String },
    date: { type: Date },
    products: {
        type: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'products'
                },
                quantity: {
                    type: Number,
                    min: [1, "Cantidad minima: 1"],
                    required: [true, "Agregar catidad"]
                }
            }
        ],
        default: []
    }
})

CartSchema.pre('find', function() {
    this.populate('products')
})

const cartModel = mongoose.model(CartCollection, CartSchema)

export  {cartModel}