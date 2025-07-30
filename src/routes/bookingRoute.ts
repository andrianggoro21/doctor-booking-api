import { Router } from 'express';
import { BookingController } from '../controllers/bookingController';

const bookingRoute = Router();
const bookingController = new BookingController();

bookingRoute.post('/', bookingController.createBooking);
bookingRoute.get('/', bookingController.getBookings);

export default bookingRoute;