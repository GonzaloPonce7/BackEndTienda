import { TicketDao } from "../dao/TicketDao";

export class TicketRepository {

    constructor() {
        this.ticketDao = new TicketDao()
    }
    async create(ticket) {
        return await this.ticketDao.create(ticket);
    }
}