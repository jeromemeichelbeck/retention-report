import { getReferenceReport } from "../managers/stats/getReferenceReport";
import { Month } from "../types/Month";
import { RetentionByEmployee } from "../types/RetentionReport";
import { generatePeriods, getThisMonth, isPeriodInvalid } from "../utils/dates";
import { mapRetentionFirstPeriodEmployees } from "../utils/mappings";

export const getClientsRetention = async (
  referenceMonth: Month,
  lastMonth = getThisMonth()
) => {
  if (isPeriodInvalid(referenceMonth, lastMonth)) {
    throw new Error(`'referenceMonth' must be before '${lastMonth}'`);
  }

  const retentionReport = generatePeriods(referenceMonth, lastMonth);

  const firstPeriod = retentionReport.at(0);

  if (!firstPeriod) {
    return retentionReport;
  }

  const referenceReport = await getReferenceReport(firstPeriod.month);

  retentionReport[0] = {
    ...firstPeriod,
    employees: referenceReport.map(mapRetentionFirstPeriodEmployees),
  };

  return retentionReport;
};
