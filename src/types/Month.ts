import { z } from "zod";
import { clientsRetentionRequestSchema } from "../schemas/stats";

export type Month = z.infer<
  typeof clientsRetentionRequestSchema
>["query"]["referenceMonth"];
