import mongoose from "mongoose";

const ProductCollection = 'products'

const ProductSchema = new mongoose.Schema({
    //id : String,
    title : { type: String, index: true },
    description : String,
    price : Number,
    thumbnail : String,
    stock : Number,
    code : String,
    status : Boolean,
    category : String
})

const productModel = mongoose.model(ProductCollection, ProductSchema)

export {productModel}