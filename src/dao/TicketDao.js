import { ticketModel } from "./models/TicketModel.js";

class TicketDao {
    async create(ticket) {
        return await ticketModel.create(ticket);
    }
}