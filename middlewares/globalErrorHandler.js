import { log } from "console";
import { isHttpError } from "http-errors-enhanced";

export function globalErrorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  if (isHttpError(err)) {
    return res.status(err.status).json({
      error: err.name,
      statusCode: err.status,
      message: err.message,
      ...(err.properties && { details: err.properties }), // Include custom properties if present
    });
  }
  res.status(500).json({
    error: "InternalServerError",
    statusCode: 500,
    message: "An unexpected error occurred on the server.",
  });
}
