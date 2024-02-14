/**
 * Main router for the application
 */

import { Router } from "express";
import { statsRouter } from "./routes/stats";

const mainRouter = Router();

mainRouter.use("/stats", statsRouter);

export { mainRouter };
