import { z } from "zod";
import { isMonth } from "../utils/type-predicates";
import { Month } from "../types/Month";

export const clientsRetentionRequestSchema = z.object({
  query: z.object({
    referenceMonth: z
      .string({
        required_error: "'referenceMonth' is required",
      })
      .regex(
        new RegExp(/^\d{4}-(0[1-9]|1[0-2])$/),
        "'referenceMonth' must be a valid month in the format 'YYYY-MM'"
      )
      .brand<"Month">(),
  }),
});
