import mongoose from "mongoose";

const UsersCollection = 'users'

const UsersSchema = new mongoose.Schema({
    //id : String,
    first_name: String,
    last_name: String,
    email: {
        type: String,
        unique: true
    },
    password: String
})

const usersModel = mongoose.model(UsersCollection, UsersSchema)

export {usersModel}