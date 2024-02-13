import dateFns from "date-fns";
import { Month } from "../types/Month";

export const getThisMonth = () =>
  dateFns.format(new Date(), "yyyy-MM") as Month;

export const isPeriodInvalid = (month: Month, monthToCompare: Month) =>
  dateFns.isEqual(month, monthToCompare) ||
  dateFns.isAfter(month, monthToCompare);

export const generatePeriods = (from: Month, to: Month) => {
  let month = from.toString();
  const thisMonth = to.toString();
  const periods = [
    {
      month,
      employees: {},
    },
  ];

  do {
    month = dateFns.format(dateFns.addMonths(month, 1), "yyyy-MM");
    periods.push({
      month,
      employees: {},
    });
  } while (dateFns.isAfter(thisMonth, month));

  return periods;
};
