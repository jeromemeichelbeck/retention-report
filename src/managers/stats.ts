import { db } from "../db/db";
import { Month } from "../types/Month";
import {
  ReferenceMonthQueryResult,
  ReferenceMonthByEmployee,
} from "../types/RetentionReport";
import { mapRetentionFirstPeriodQuery } from "../utils/mappings";

export const getReferenceReport = async (referenceMonth: Month) => {
  const statement = db.prepare(/* sql */ `
    SELECT
      a2.date,
      e.employee_id,
      concat(e.first_name, " ", e.last_name) as employee_name,
      group_concat(a2.client_id) as clients
    FROM (
      SELECT
        a1.client_id,
        min(a1.date) as first_date
      FROM
        APPOINTMENTS a1
      WHERE a1.date LIKE ?
        GROUP BY a1.client_id
    ) sub
    INNER JOIN APPOINTMENTS a2
      ON sub.client_id = a2.client_id AND  sub.first_date = a2.date
    INNER JOIN EMPLOYEES e
      ON a2.employee_id = e.employee_id
    GROUP BY a2.employee_id
  `);

  const referenceReport = new Promise<ReferenceMonthByEmployee[]>(
    (resolve, reject) => {
      statement
        .bind(`${referenceMonth}%`)
        .all<ReferenceMonthQueryResult>((err, rows) => {
          if (err) {
            reject(new Error("Error while fetching appointments"));
          }

          const referenceReport = rows.map(mapRetentionFirstPeriodQuery);

          resolve(referenceReport);
        });
    }
  );

  return referenceReport;
};

export const getClientsRetentionByMonth = async (
  clients: number[],
  month: Month
) => {
  const statement = db.prepare(/* sql */ `
    SELECT
      client_id,
      date
    FROM
      APPOINTMENTS
    WHERE
      client_id IN (${prepareIn(clients)})
      AND date LIKE ?
  `);

  const retention = new Promise<number>((resolve, reject) => {
    statement.bind(...clients, `${month}%`).all((err, rows) => {
      if (err) {
        reject(new Error("Error while fetching appointments"));
      }

      resolve(rows.length);
    });
  });

  return retention;
};
