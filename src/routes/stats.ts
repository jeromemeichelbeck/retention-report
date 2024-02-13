import { Router } from "express";
import { clientsRetentionRequestSchema } from "../schemas/stats";
import { getClientsRetention } from "../services/stats";

const statsRouter = Router();

statsRouter.get("/clientRetention", async (req, res) => {
  try {
    const { query } = clientsRetentionRequestSchema.parse(req);
    const result = await getClientsRetention(query.referenceMonth);

    res.status(200).json(result);
  } catch (error) {
    res.status(400).send(error.errors);
  }
});

export { statsRouter };
