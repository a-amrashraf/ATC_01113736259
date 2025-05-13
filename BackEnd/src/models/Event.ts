import mongoose from "mongoose";



export interface Event extends mongoose.Document{
    EventName: string,
    EventDate: string,
    EventLocation: string,
    EventTime: string,
    EventDescription: string,
    EventImage: string,
    EventPrice: number,
    EventCategory: string[],
    EventPrices: {ticketType: string; price: number}[],
    attendees: [{
        userId: mongoose.Types.ObjectId,
        tickets:[{
            ticketType: string,
            quantity: number
        }],
    }]
}


const eventSchema = new mongoose.Schema({
    EventName: { type: String, required: true },
    EventDate: { type: String, required: true },
    EventLocation: { type: String, required: true },
    EventTime: { type: String, required: true },
    EventDescription: { type: String, required: true },
    EventImage: { type: String, required: true },
    EventPrice: { type: Number, required: true },
    EventCategory: [{ type: String, required: true }],
    EventPrices: [{ticketType: {type: String}, price: {type: Number} , required: true}],
    attendees: [{
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        tickets:[{
            ticketType: {type: String},
            quantity: {type: Number}
        }],
        default:[]
    }]
}, { timestamps: true });


export default mongoose.model<Event>("Events", eventSchema);