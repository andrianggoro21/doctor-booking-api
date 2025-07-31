import { Router } from "express";
import { BookingController } from "../controllers/bookingController";
import { validateRequest } from "../middleware/validateRequest";
import { createBookingSchema } from "../validators/bookingValidator";

const bookingRoute = Router();
const bookingController = new BookingController();

bookingRoute.post(
  "/",
  validateRequest(createBookingSchema),
  bookingController.createBooking
);
bookingRoute.get("/", bookingController.getBookings);

export default bookingRoute;
