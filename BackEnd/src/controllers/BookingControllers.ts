import { Request, Response } from "express";
import Booking from "../models/Booking";
import Event from "../models/Event";
import User from "../models/User"; 
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
          totalPrice: 0, 
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




export const getUserBookings = async (req: Request, res: Response): Promise<void> => {
  const username = req.header('X-Username');
  
  if (!username) {
    res.status(400).json({ message: 'Username header missing' });
    return;
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const bookings = await Booking.find({ userId: user._id }).populate({
      path: 'eventId',
      select: 'EventName EventDate EventTime,', 
    });

    res.status(200).json({ bookings });  // Just send the response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching bookings' });
  }
};
