import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";

/**
 * Simple error handler  
 */
export const errorHandler: ErrorRequestHandler = (
  error: Error,
  _req,
  res,
  _next
) => {
  if (error instanceof ZodError) {
    return res.status(400).send(error.errors);
  }

  return res.status(500).send([{ message: error.message }]);
};
