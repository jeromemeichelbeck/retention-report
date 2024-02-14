import * as dateFns from "date-fns";
import { Month } from "../types/Month";
import { RetentionReportByMonth } from "../types/RetentionReport";

/**
 * Get the current month in the format 'YYYY-MM'
 */
export const getThisMonth = () =>
  dateFns.format(new Date(), "yyyy-MM") as Month;

/**
 * Check if a period is invalid
 * A period is invalid if it's equal or after the month to compare
 */
export const isPeriodInvalid = (month: Month, monthToCompare: Month) =>
  dateFns.isEqual(month, monthToCompare) ||
  dateFns.isAfter(month, monthToCompare);

/**
 * Generate the periods between two months
 */
export const generatePeriods = (from: Month, to: Month) => {
  let currentMonth = from;

  const periods = [
    {
      month: currentMonth,
      employees: {},
    },
  ];

  do {
    currentMonth = dateFns.format(
      dateFns.addMonths(currentMonth, 1),
      "yyyy-MM"
    ) as Month;

    periods.push({
      month: currentMonth,
      employees: {},
    });
  } while (dateFns.isAfter(to, currentMonth));

  return periods as RetentionReportByMonth[];
};
