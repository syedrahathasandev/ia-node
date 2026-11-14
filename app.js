import e from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import { globalErrorHandler } from "./middlewares/globalErrorHandler.js";
import { NotFoundError } from "http-errors-enhanced";
const app = e();
app.use(e.json());
app.use(e.urlencoded());
app.use(helmet());
app.use(
  cors({
    origin: ["http://localhost:5173/"],
  }),
);
app.use(cookieParser());

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "UP",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

import authRouter from "./routes/auth.js";

app.use("/api/v1/auth", authRouter);

app.use((req, res, next) => {
  next(new NotFoundError(`Route ${req.originalUrl} does not exist.`));
});

app.use(globalErrorHandler);

export { app };
