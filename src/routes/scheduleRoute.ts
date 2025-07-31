import { Router } from "express";
import { ScheduleController } from "../controllers/scheduleController";
import { validateRequest } from "../middleware/validateRequest";
import {
  createScheduleSchema,
  getSchedulesSchema,
} from "../validators/scheduleValidator";

const scheduleRoute = Router();
const scheduleController = new ScheduleController();

scheduleRoute.post(
  "/",
  validateRequest(createScheduleSchema),
  scheduleController.createSchedule
);
scheduleRoute.get(
  "/",
  scheduleController.getSchedules
);

export default scheduleRoute;
