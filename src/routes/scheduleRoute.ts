import { Router } from 'express';
import { ScheduleController } from '../controllers/scheduleController';

const scheduleRoute = Router();
const scheduleController = new ScheduleController();

scheduleRoute.post('/', scheduleController.createSchedule);
scheduleRoute.get('/', scheduleController.getSchedules);

export default scheduleRoute;