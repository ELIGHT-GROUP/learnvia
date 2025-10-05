import "dotenv/config";
import express, { Express } from "express";
import cors from "cors";
import { connectDB } from "./config/mongo.config";
import { createServiceLogger } from "./utils/logger.util";
import morganMiddleware from "./middleware/logger.middleware";
import authRoutes from "./routes/auth.routes";
// vehicle/auction routes removed for auth-only template
import usersRoutes from "./routes/users.routes";
import errorHandler from "./middleware/error.middleware";

const logger = createServiceLogger("Server");

const app: Express = express();

app.use(morganMiddleware);

app.use(
  cors({
    origin: ["http://localhost:8080", "http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);

// Centralized error handler (should be last middleware)
app.use(errorHandler);

const PORT = process.env.PORT || 8080;
const startServer = async () => {
  try {
    logger.info("Starting server initialization...");
    await connectDB();
    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });
  } catch (error) {
    logger.error("Server startup error:", error);
    process.exit(1);
  }
};

startServer();
