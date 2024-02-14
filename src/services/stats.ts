import { getReferenceReport } from "../managers/stats/getReferenceReport";
import { Month } from "../types/Month";
import { generatePeriods, getThisMonth, isPeriodInvalid } from "../utils/dates";

export const getClientsRetention = async (
  referenceMonth: Month,
  lastMonth = getThisMonth()
) => {
  if (isPeriodInvalid(referenceMonth, lastMonth)) {
    throw new Error(`'referenceMonth' must be before '${lastMonth}'`);
  }

  const retentionReport = generatePeriods(referenceMonth, lastMonth);

  const firstPeriod = retentionReport[0];

  if (!firstPeriod) {
    return retentionReport;
  }

  const referenceReport = await getReferenceReport(firstPeriod.month);

  console.log(referenceReport);

  return retentionReport;
};
