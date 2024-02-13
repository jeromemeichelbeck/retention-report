import { z } from "zod";
import { isMonth } from "../utils/type-predicates";
import { Month } from "../types/Month";

export const clientsRetentionRequestSchema = z.object({
  query: z.object({
    referenceMonth: z
      .string()
      .regex(new RegExp(/^\d{4}-(0[1-9]|1[0-2])$/))
      .brand<"Month">(),
  }),
});
