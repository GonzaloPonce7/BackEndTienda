import mongoose from "mongoose";

const messagesCollection = "messages"

const messagesSchema = new mongoose.Schema({
    user: String,
    message: String,
    date: Date
})

const MessagesModel = mongoose.model(messagesCollection, messagesSchema)

export default MessagesModel