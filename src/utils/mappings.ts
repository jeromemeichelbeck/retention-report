import {
  ReferenceMonthByEmployee,
  RetentionByEmployee,
} from "../types/RetentionReport";

export const mapRetentionFirstPeriodEmployees = ({
  clients,
  ...report
}: ReferenceMonthByEmployee): RetentionByEmployee => ({
  ...report,
  nbrClients: clients.length,
  retentionRate: 1,
});
