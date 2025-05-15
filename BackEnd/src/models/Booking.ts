import mongoose from "mongoose";

export interface Booking extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  eventId: mongoose.Types.ObjectId;
  tickets: {
    ticketType: string;
    quantity: number;
  }[];
  bookedAt: Date;
}

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Events", required: true },
  tickets: [
    {
      ticketType: { type: String },
      quantity: { type: Number, default: 1 },
    },
  ],
  bookedAt: { type: Date, default: Date.now },
});

export default mongoose.model<Booking>("Booking", bookingSchema);
