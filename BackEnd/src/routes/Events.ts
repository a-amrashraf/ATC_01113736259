import { Router } from "express";
import { GetAllEvents, GetEvent, createEvent, EditEvent, DeleteEvent, FilterEvents } from "../controllers/EventController";

const router = Router();

router.get("/Events", GetAllEvents);
router.get("/Event/:id", GetEvent);
router.post("/createEvent", createEvent);
router.put("/EditEvent/:id", EditEvent);
router.delete("/DeleteEvent/:id", DeleteEvent);
router.get("/FilteredEvents", FilterEvents);

export default router;