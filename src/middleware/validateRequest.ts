import { Request, Response, NextFunction } from "express";
import { z } from "zod";

export const validateRequest =
  (schema: z.Schema<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    console.log("req.body", req.body);
    
    const validationResult = schema.safeParse(req.body);

    if (!validationResult.success) {
      const formattedErrors = simplifyZodError(validationResult.error.format);
      return res.status(400).json({
        status: 400,
        message: "Data validation failed",
        errors: formattedErrors,
      });
    }

    req.body = validationResult.data;
    next();
  };

// Function to simplify Zod error format
const simplifyZodError = (zodError: any) => {
  const simplified: any = {};

  for (const key in zodError) {
    if (key !== "_errors") {
      if (typeof zodError[key] === "object" && zodError[key]?._errors?.length) {
        simplified[key] = zodError[key]._errors[0]; // Just return the first error message
      } else {
        simplified[key] = simplifyZodError(zodError[key]); // Recursively simplify nested errors
      }
    }
  }

  return simplified;
};
