import dateFns from "date-fns";
import { Month } from "../types/Month";

export const generatePeriods = (referenceMonth: Month) => {
  let month = referenceMonth.toString();
  const thisMonth = dateFns.format(new Date(), "yyyy-MM");
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
