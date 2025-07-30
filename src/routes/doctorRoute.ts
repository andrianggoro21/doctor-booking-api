import { Router } from 'express';
import { DoctorController } from '../controllers/doctorController';

const doctorRoute = Router();
const doctorController = new DoctorController();

doctorRoute.post('/', doctorController.createDoctor);
doctorRoute.get('/', doctorController.getDoctors);

export default doctorRoute;