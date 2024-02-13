import { db } from "../db/db";
import { Month } from "../types/Month";
import { generatePeriods, getThisMonth, isPeriodInvalid } from "../utils/dates";

export const getClientsRetention = async (referenceMonth: Month) => {
  const thisMonth = getThisMonth();

  if (isPeriodInvalid(referenceMonth, thisMonth)) {
    throw new Error(`'referenceMonth' must be before '${thisMonth}'`);
  }

  const retentionReport = generatePeriods(referenceMonth, thisMonth);

  const firstPeriod = retentionReport[0];

  if (!firstPeriod) {
    return retentionReport;
  }

  console.log(`'${firstPeriod.month}%'`);

  const statement = db.prepare(`
    SELECT
      DISTINCT a.client_id,
      e.employee_id,
      e.first_name,
      e.last_name
    FROM
      APPOINTMENTS a
    LEFT JOIN
      EMPLOYEES e
    ON
      a.employee_id = e.employee_id
    WHERE
      a.date LIKE ?;
    ORDER BY
      a.date ASC; 
    `);
  const appointments = statement
    .bind(`${firstPeriod.month}%`)
    .all((err, rows) => {
      if (err) {
        throw new Error("Error while fetching appointments");
      }
      console.log(rows);
    });

  // console.log(appointments);

  return retentionReport;
};
