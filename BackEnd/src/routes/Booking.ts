import { Router } from "express";
import { bookEvent, getUserBookings } from "../controllers/BookingControllers";
import { auth } from "../middleware/auth";

const router = Router();

router.post("/book/:eventId", auth, bookEvent);
router.get("/myBookings", auth, getUserBookings);

export default router;
