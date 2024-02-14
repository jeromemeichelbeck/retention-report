import { NextFunction, Request, Response } from "express";
import { clientsRetentionRequestSchema } from "../schemas/stats";
import { getClientsRetention } from "../services/stats";
import { nextDay } from "date-fns";

export const getClientsRetentionHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { query } = clientsRetentionRequestSchema.parse(req);
    const { referenceMonth, lastMonth } = query;
    const result = await getClientsRetention(referenceMonth, lastMonth);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
