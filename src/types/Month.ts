import { z } from "zod";
import { clientsRetentionRequestSchema } from "../schemas/stats";

/**
 * A month in the format 'YYYY-MM'
 */
export type Month = z.infer<
  typeof clientsRetentionRequestSchema
>["query"]["referenceMonth"];
