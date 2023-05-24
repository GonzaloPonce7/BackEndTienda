import { ticketModel } from "../models/TicketModel.js";

export class TicketDao {
    async create(ticket) {
        return await ticketModel.create(ticket);
    }

    async getById(tid) {
        return await ticketModel.findById(tid).lean().exec();
    }
}