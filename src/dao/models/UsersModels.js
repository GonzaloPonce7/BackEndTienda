import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

const UsersCollection = 'users'

const UsersSchema = new mongoose.Schema({
    //id : String,
    fist_name: String,
    last_name: String,
    email: String,
    age: Number,
    password: String
})

const usersModel = mongoose.model(UsersCollection, UsersSchema)

export {usersModel}