import rateLimit from "express-rate-limit";

export const createRateLimit = (
  windowMs: number = 15 * 60 * 1000,
  max: number = 100
) => {
  return rateLimit({
    windowMs,
    max,
    message: {
      success: false,
      message: "Terlalu banyak request, coba lagi nanti",
    },
    standardHeaders: true,
    legacyHeaders: false,
  });
};
