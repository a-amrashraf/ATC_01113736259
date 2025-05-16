import mongoose from "mongoose";



export interface User extends mongoose.Document{
    username: string,
    email: string,
    password: string,
    isadmin: boolean,
    bookings: [{
        eventId: mongoose.Types.ObjectId,
        tickets:[{
            ticketType: string,
            quantity: number
        }],
        totalPrice: number,
    }]
}


const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    email: { type: String, required: true, unique: true},
    password: {type: String, required: true},
    isadmin: {type: Boolean, default: false},
    bookings: [{
        eventId: {type: mongoose.Schema.Types.ObjectId, ref: "Events"},
        tickets:[{
            ticketType: {type: String},
            quantity: {type: Number}
        }],
        totalPrice: {type: Number},
        default:[]
    }]
}, { timestamps: true });


export default mongoose.model<User>("User", userSchema);