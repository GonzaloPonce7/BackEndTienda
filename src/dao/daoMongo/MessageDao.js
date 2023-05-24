import MessagesModel from "../models/MessageModel.js";

export class MessageDao {

    constructor() {}

    async get() {
        return await MessagesModel.find()
    }

    async create (data) {
        await MessagesModel.create(data)
        return true
    }

    async getByDate (date) {
        return await MessagesModel.findOne(date) 
    }

}