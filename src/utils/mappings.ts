import {
  ReferenceMonthByEmployee,
  ReferenceMonthQueryResult,
  RetentionByEmployee,
} from "../types/RetentionReport";

export const mapRetentionFirstPeriodQuery = (
  row: ReferenceMonthQueryResult
): ReferenceMonthByEmployee => ({
  employee: {
    id: row.employee_id,
    name: row.employee_name,
  },
  clients: row.clients.split(",").map(Number),
});

export const mapRetentionFirstPeriodEmployees = ({
  clients,
  ...report
}: ReferenceMonthByEmployee): RetentionByEmployee => ({
  ...report,
  nbrClients: clients.length,
  retentionRate: 1,
});
