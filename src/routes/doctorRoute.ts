import { Router } from "express";
import { DoctorController } from "../controllers/doctorController";
import { validateRequest } from "../middleware/validateRequest";
import {
  createDoctorSchema,
  getDoctorSchema,
} from "../validators/doctorValidator";

const doctorRoute = Router();
const doctorController = new DoctorController();

doctorRoute.post(
  "/",
  validateRequest(createDoctorSchema),
  doctorController.createDoctor
);
doctorRoute.get(
  "/",
  validateRequest(getDoctorSchema),
  doctorController.getDoctors
);

export default doctorRoute;
