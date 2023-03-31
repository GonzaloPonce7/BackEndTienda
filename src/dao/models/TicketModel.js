import mongoose from "mongoose";

const TicketsCollection = 'tickets'

const TicketSchema = new mongoose.Schema({
    _id: { type: String },
    code: { type: String, unique: true },
    purchase_datetime: { type: Date },
    amount: { type: Number },
    purchaser:{ type: String }
})

const ticketModel = mongoose.model(TicketsCollection, TicketSchema)

export { ticketModel }