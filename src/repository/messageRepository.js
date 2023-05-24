import { MessageDao } from "../dao/daoMongo/MessageDao.js"

export class MessagesRepository {

    constructor() {
        this.messageDao = new MessageDao()
    }

    async get() {
        await this.messageDao.get()
    }

    async getByDate(date) {
        await this.messageDao.getByDate(date)
    }

    async create(data) {
        await this.messageDao(data)
    }

}