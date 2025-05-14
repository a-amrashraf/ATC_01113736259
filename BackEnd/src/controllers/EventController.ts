import { Request, Response } from "express";
import Event from "../models/Event";

export const createEvent = async (req: Request, res: Response) => {
  const {
    EventName,
    EventDescription,
    EventDate,
    EventTime,
    EventLocation,
    EventImage,
    EventPrices,
    EventCategory,
  } = req.body;

  try {
    const newEvent = new Event({
      EventName,
      EventDescription,
      EventDate,
      EventTime,
      EventLocation,
      EventImage,
      EventPrices,
      EventCategory,
    });

    await newEvent.save();

    res.status(201).json({ message: "Event created successfully", newEvent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating event" });
  }
};

export const GetAllEvents = async (req: Request, res: Response) => {
  try {
    const Events = await Event.find().lean();

    res.status(200).json({ Events });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "No Events Found" });
  }
};

export const GetEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const EventId = req.params.id;

    const CertainEvent = await Event.findById(EventId).lean();

    if (!CertainEvent) {
      res.status(404).json({ message: "Event not found" });
      return;
    }

    res.status(200).json({ CertainEvent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error FInding Event" });
  }
};

export const EditEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const EventId = req.params.id;

    const CertainEvent: Event | null = await Event.findById(EventId);

    if (!CertainEvent) {
      res.status(404).json({ message: "Event not found" });
      return;
    }

    const UpdatedEvent = await Event.findByIdAndUpdate(EventId, req.body, {
      new: true,
    });

    res
      .status(200)
      .json({ message: "Event Updated successfully", UpdatedEvent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating event" });
  }
};

export const DeleteEvent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const EventId = req.params.id;

    const CertainEvent: Event | null = await Event.findById(EventId);

    if (!CertainEvent) {
      res.status(404).json({ message: "Event not found" });
      return;
    }

    const DeletedEvent = await Event.findByIdAndDelete(EventId);

    res
      .status(200)
      .json({ message: "Event deleted successfully", DeletedEvent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating event" });
  }
};

export const FilterEvents = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { EventCategory } = req.query;

    if (!EventCategory) {
      res.status(400).json({ message: "EventCategory is required or invalid" });
      return;
    }

    const categories = Array.isArray(EventCategory)
      ? EventCategory
      : (EventCategory as string).split(",");

    const filteredEvents = await Event.find({
      EventCategory: { $in: categories },
    }).lean();

    if (filteredEvents.length === 0) {
      res.status(404).json({ message: "No events found for this category" });
      return;
    }

    res
      .status(200)
      .json({ message: "Events filtered successfully", filteredEvents });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error filtering events" });
  }
};

export default {
  createEvent,
  GetAllEvents,
  GetEvent,
  EditEvent,
  DeleteEvent,
  FilterEvents,
};
