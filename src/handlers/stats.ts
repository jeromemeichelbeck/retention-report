import { NextFunction, Request, Response } from "express";
import { clientsRetentionRequestSchema } from "../schemas/stats";
import { getClientsRetention } from "../services/stats";

/**
 * Get the client retention report given a reference month and optionally a last month
 * @example "GET /api/stats/clientRetention?referenceMonth=2023-03&lastMonth=2023-06"
 */
export const getClientsRetentionHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { query } = clientsRetentionRequestSchema.parse(req);
    const { referenceMonth, lastMonth } = query;
    const report = await getClientsRetention(referenceMonth, lastMonth);

    res.status(200).json(report);
  } catch (error) {
    next(error);
  }
};
