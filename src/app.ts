import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import mainRoute from "./routes/mainRoute";
import { createRateLimit } from "./middleware/rateLimiter";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(helmet());
app.use(createRateLimit());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", mainRoute);

app.listen(PORT, () => {
  console.log(`Server is running http://localhost:${PORT}`);
});
