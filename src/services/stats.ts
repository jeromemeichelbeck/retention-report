import {
  getClientsRetentionByMonth,
  getReferenceReport,
} from "../managers/stats";
import { Month } from "../types/Month";
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

  return Promise.all(
    retentionReport.map(async (period, index) => {
      if (index === 0) {
        // Assign the employees to the first period
        return {
          ...firstPeriod,
          employees: referenceReport.map(mapRetentionFirstPeriodEmployees),
        };
      }

      const employees = await Promise.all(
        referenceReport.map(async (employee) => {
          const clientsRetention = await getClientsRetentionByMonth(
            employee.clients,
            period.month
          );

          return {
            ...employee,
            clientsRetention,
          };
        })
      );

      return {
        ...period,
        employees: employees.map(mapRetentionFirstPeriodEmployees),
      };
    })
  );
};
