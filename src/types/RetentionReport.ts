import { Month } from "./Month";

export type RetentionByEmployee = {
  employeeName: string;
  initialNumberOfClients: number;
  clientsRetention: number;
};

export type RetentionReportByMonth = {
  month: Month;
  employees: Array<RetentionByEmployee>;
};

export type ReferenceMonthQueryResult = {
  month: Month;
  employee_id: number;
  employee_name: string;
  clients: string;
};

export type ReferenceMonthByEmployee = {
  employeeName: string;
  clients: number[];
  clientsRetention?: number;
};
