import { Month } from "../types/Month";
import { generatePeriods } from "../utils/generatePeriods";

export const getClientsRetention = async (referenceMonth: Month) => {
  const retentionReport = generatePeriods(referenceMonth);

  return retentionReport;
};
