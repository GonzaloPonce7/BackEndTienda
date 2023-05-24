import mongoose from "mongoose";

const TicketsCollection = 'tickets'

const TicketSchema = new mongoose.Schema({
    //_id: { type: String },
    code: { type: String, unique: true },
    date: { type: Date },
    total: { type: Number },
    user:{ type: String },
    products: []
})

const ticketModel = mongoose.model(TicketsCollection, TicketSchema)

export { ticketModel }