import {
  ReferenceMonthByEmployee,
  ReferenceMonthQueryResult,
  RetentionByEmployee,
} from "../types/RetentionReport";

export const mapRetentionFirstPeriodQuery = (
  row: ReferenceMonthQueryResult
): ReferenceMonthByEmployee => {
  const clients = row.clients.split(",").map(Number);
  return {
    employeeId: row.employee_id,
    employeeName: row.employee_name,
    clients,
  };
};

export const mapRetentionForEmployees = ({
  clients,
  clientsRetention,
  ...report
}: ReferenceMonthByEmployee): RetentionByEmployee => ({
  employeeId: report.employeeId,
  employeeName: report.employeeName,
  initialNumberOfClients: clients.length,
  clientsRetention: clientsRetention || clients.length,
});
