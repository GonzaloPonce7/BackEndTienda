import { TicketDao } from "../dao/daoMongo/TicketDao.js";

export class TicketRepository {

    constructor() {
        this.ticketDao = new TicketDao()
    }
    
    async create(ticket) {
        return await this.ticketDao.create(ticket);
    }

    async getById(tid) {
        return await this.ticketDao.getById(tid)
    }
}