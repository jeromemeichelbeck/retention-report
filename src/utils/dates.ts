import * as dateFns from "date-fns";
import { Month } from "../types/Month";
import { RetentionReportByMonth } from "../types/RetentionReport";

export const getThisMonth = () =>
  dateFns.format(new Date(), "yyyy-MM") as Month;

export const isPeriodInvalid = (month: Month, monthToCompare: Month) =>
  dateFns.isEqual(month, monthToCompare) ||
  dateFns.isAfter(month, monthToCompare);

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
