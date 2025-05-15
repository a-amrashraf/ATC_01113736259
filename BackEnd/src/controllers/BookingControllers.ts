import { Request, Response } from "express";
import Booking from "../models/Booking";
import Event from "../models/Event";
import User from "../models/User"; // <-- Import User model
import mongoose from "mongoose";

export const bookEvent = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const { ticketType } = req.body;
  const eventId = req.params.eventId;

  try {
    let booking = await Booking.findOne({ userId, eventId });

    if (booking) {
      const ticketIndex = booking.tickets.findIndex(
        (t) => t.ticketType === ticketType
      );

      if (ticketIndex !== -1) {
        booking.tickets[ticketIndex].quantity += 1;
      } else {
        booking.tickets.push({ ticketType, quantity: 1 });
      }
    } else {
      booking = new Booking({
        userId,
        eventId,
        tickets: [{ ticketType, quantity: 1 }],
      });
    }

    await booking.save();

    const user = await User.findById(userId);
    if (user) {
      const userBookingIndex = user.bookings.findIndex((b) =>
        b.eventId.equals(eventId)
      );

      if (userBookingIndex !== -1) {
        // Update tickets quantity for that booking in user document
        const tickets = user.bookings[userBookingIndex].tickets;
        const ticketIdx = tickets.findIndex((t) => t.ticketType === ticketType);
        if (ticketIdx !== -1) {
          tickets[ticketIdx].quantity += 1;
        } else {
          tickets.push({ ticketType, quantity: 1 });
        }
      } else {
        user.bookings.push({
          eventId: new mongoose.Types.ObjectId(eventId),
          tickets: [{ ticketType, quantity: 1 }],
          totalPrice: 0, // update as needed
        });
      }

      await user.save();
    }

    const event = await Event.findById(eventId);
    if (event) {
      const attendeeIndex = event.attendees.findIndex((a) =>
        a.userId.equals(userId)
      );

      if (attendeeIndex !== -1) {
        const attendeeTickets = event.attendees[attendeeIndex].tickets;
        const ticketIdx = attendeeTickets.findIndex(
          (t) => t.ticketType === ticketType
        );
        if (ticketIdx !== -1) {
          attendeeTickets[ticketIdx].quantity += 1;
        } else {
          attendeeTickets.push({ ticketType, quantity: 1 });
        }
      } else {
        event.attendees.push({
          userId: new mongoose.Types.ObjectId(String(userId)),
          tickets: [{ ticketType, quantity: 1 }],
        });
      }

      await event.save();
    }

    res.status(201).json({ message: "Ticket booked successfully", booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error booking ticket" });
  }
};

export const getUserBookings = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;

  try {
    const bookings = await Booking.find({ userId }).populate("eventId");

    res.status(200).json({ bookings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching bookings" });
  }
};
