import { z } from "zod";

/**
 * A regex to validate a month in the format 'YYYY-MM'
 * With month being a number between 01 and 12
 */
export const validMonthRegex = new RegExp(/^\d{4}-(0[1-9]|1[0-2])$/);

/**
 * Zod schema to validate the request for the clients retention report
 */
export const clientsRetentionRequestSchema = z.object({
  query: z.object({
    referenceMonth: z
      .string({
        required_error: "'referenceMonth' is required",
      })
      .regex(
        validMonthRegex,
        "'referenceMonth' must be a valid month in the format 'YYYY-MM'"
      )
      .brand<"Month">(),
    lastMonth: z
      .string()
      .regex(
        validMonthRegex,
        "'lastMonth' must be a valid month in the format 'YYYY-MM'"
      )
      .brand<"Month">()
      .optional(),
  }),
});
