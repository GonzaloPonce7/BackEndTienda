import mongoose from "mongoose";

const CartCollection = 'carts'

// const CartSchema = new mongoose.Schema({
//     _id: String,
//     items: [{
//         productId : String,
//         quantity : {
//             type : Number,
//             min : [1, "Cantidad minima: 1"],
//             required : [true, "Agregar catidad"]
//         }
//     }]
// })

const CartSchema = new mongoose.Schema({
    _id: { type: String, index: true },
    date: { type: Date.now },
    products: {
        type: [
            {
                product: {
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

const CartModel = mongoose.model(CartCollection, CartSchema)

export {CartModel}