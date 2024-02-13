import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";

export const errorHandler: ErrorRequestHandler = (
  error: Error,
  _req,
  res,
  _next
) => {
  if (error instanceof ZodError) {
    return res.status(400).send(error.errors);
  }

  return res.status(400).send([{ message: error.message }]);
};
