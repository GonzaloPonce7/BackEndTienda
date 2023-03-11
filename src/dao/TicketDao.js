import { ticketModel } from "./models/TicketModel.js";

export class TicketDao {
    async create(ticket) {
        return await ticketModel.create(ticket);
    }
}