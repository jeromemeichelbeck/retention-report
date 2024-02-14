import {
  getClientsRetentionByMonth,
  getReferenceReport,
} from "../managers/stats";
import { Month } from "../types/Month";
import { generatePeriods, getThisMonth, isPeriodInvalid } from "../utils/dates";
import { mapRetentionForEmployees } from "../utils/mappings";

/**
 * Compute the retention report from a given reference month to the last month (inclusive)
 *
 * @param referenceMonth The reference month to start the report
 * @param lastMonth The last month to include in the report (defaults to the current month)
 *
 * @returns A list of periods with the retention report for each period
 */
export const getClientsRetention = async (
  referenceMonth: Month,
  lastMonth = getThisMonth()
) => {
  if (isPeriodInvalid(referenceMonth, lastMonth)) {
    throw new Error(`'referenceMonth' must be before '${lastMonth}'`);
  }

  // First get a skeleton of the periods
  const retentionReport = generatePeriods(referenceMonth, lastMonth);

  // Get the report for the first period
  // This will be the reference for the rest of the periods
  const firstPeriod = retentionReport.at(0);

  if (!firstPeriod) {
    return retentionReport;
  }

  const referenceReport = await getReferenceReport(firstPeriod.month);

  // Map through each period
  return Promise.all(
    retentionReport.map(async (period, index) => {
      if (index === 0) {
        // Assign the employees to the first period
        return {
          ...firstPeriod,
          employees: referenceReport.map(mapRetentionForEmployees),
        };
      }

      // Map through each employee for the remaining periods
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
        employees: employees.map(mapRetentionForEmployees),
      };
    })
  );
};
