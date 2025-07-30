import { Router } from "express";
import { errorHandler, notFound } from "../middleware/errorHandler";
import doctorRoute from "./doctorRoute";
import scheduleRoute from "./scheduleRoute";
import bookingRoute from "./bookingRoute";

const mainRoute = Router();

mainRoute.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

mainRoute.use('/doctors', doctorRoute);
mainRoute.use('/schedules', scheduleRoute);
mainRoute.use('/bookings', bookingRoute);

mainRoute.use(notFound);
mainRoute.use(errorHandler);

export default mainRoute;