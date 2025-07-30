import { Request, Response, NextFunction } from "express";
import { sendError } from "../utils/responseHandler";

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  console.error("Error:", error);

  if (res.headersSent) {
    return next(error);
  }

  return sendError(res, "Internal Server Error", 500, error.message);
};

export const notFound = (req: Request, res: Response): Response => {
  return sendError(res, `Route ${req.originalUrl} not found`, 404);
};
