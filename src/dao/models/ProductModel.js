import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

const ProductCollection = 'products'

const ProductSchema = new mongoose.Schema({
    //id : String,
    title : { type: String },
    description : String,
    price :{ Number },
    thumbnail : String,
    stock : Number,
    code : String,
    status : Boolean,
    category : String
})

ProductSchema.plugin(mongoosePaginate)
const productModel = mongoose.model(ProductCollection, ProductSchema)

export {productModel}