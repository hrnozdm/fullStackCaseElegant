import "reflect-metadata";
import express from "express";
import cors from "cors";
import { HttpError, useExpressServer } from "routing-controllers";
import connectToDB from "@/database/db";
import { UserController } from "@/controller/user.controller";
import { PatientController } from "@/controller/patient.controller";
import { authenticateToken } from "@/middleware/auth.middleware";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//cors
app.use(cors());

// Routing Controllers setup
useExpressServer(app, {
  controllers: [UserController, PatientController],
  middlewares: [authenticateToken],
  interceptors: [],
  defaultErrorHandler: true,
  validation: true,
});

// Global error handler
app.use(
  (
    error: HttpError,
    req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    console.error("Global error handler:", error);
    res.status(error.httpCode || 500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
);

// 404 handler
app.use((req, res) => {
  return res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

async function startServer() {
  try {
    await connectToDB();
    app.listen(PORT, () => {
      console.log("--------------------------------");
      console.log("Database is connected");
      console.log("--------------------------------");
      console.log(`Server is running on port ${PORT}`);
      console.log(
        `API endpoints available at http://localhost:${PORT}/api/users`
      );
    });
  } catch (error) {
    console.error("Server error:", error);
    process.exit(1);
  }
}

startServer();
