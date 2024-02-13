import { Month } from "../types/Month";
import { generatePeriods, getThisMonth, isPeriodInvalid } from "../utils/dates";

export const getClientsRetention = async (referenceMonth: Month) => {
  const thisMonth = getThisMonth();

  if (isPeriodInvalid(referenceMonth, thisMonth)) {
    throw new Error(`'referenceMonth' must be before '${thisMonth}'`);
  }

  const retentionReport = generatePeriods(referenceMonth, thisMonth);

  return retentionReport;
};
