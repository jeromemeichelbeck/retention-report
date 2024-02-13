import { Router } from "express";
import { getClientsRetentionHandler } from "../handlers/stats";

const statsRouter = Router();

statsRouter.get("/clientRetention", getClientsRetentionHandler);

export { statsRouter };
