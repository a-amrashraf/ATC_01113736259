import { Request, Response } from "express";
import Event from "../models/Event";

const createEvent = async (req: Request, res: Response) => {
  const {
    EventName,
    EventDescription,
    EventDate,
    EventTime,
    EventLocation,
    EventImage,
    EventPrice,
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
      EventPrice,
      EventCategory,
    });

    res.status(201).json({ message: "Event created successfully", newEvent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating event" });
  }
};

const GetAllEvents = async (req: Request, res: Response) => {
  try {
    const Events = await Event.find();

    res.status(200).json({ Events });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "No Events Found" });
  }
};

const GetEvent = async (req: Request, res: Response) => {
  try {
    const EventId = req.params.id;

    const CertainEvent = await Event.findById(EventId);

    if (!CertainEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({ CertainEvent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error FInding Event" });
  }
};

const EditEvent = async (req: Request, res: Response) => {
  try {
    const EventId = req.params.id;

    const CertainEvent: Event | null = await Event.findById(EventId);

    if (!CertainEvent) {
      return res.status(404).json({ message: "Event not found" });
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

const DeleteEvent = async (req: Request, res: Response) => {
  try {
    const EventId = req.params.id;

    const CertainEvent: Event | null = await Event.findById(EventId);

    if (!CertainEvent) {
      return res.status(404).json({ message: "Event not found" });
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

const FilterEvents = async (req: Request, res: Response) => {
  try {
    const { EventCategory } = req.query;

    if (!EventCategory) {
      return res
        .status(400)
        .json({ message: "EventCategory is required or invalid" });
    }

    const filteredEvents = await Event.find({ EventCategory });

    if (filteredEvents.length === 0) {
      return res
        .status(404)
        .json({ message: "No events found for this category" });
    }

    res
      .status(200)
      .json({ message: "Events filtered successfully", filteredEvents });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error filtering events" });
  }
};
