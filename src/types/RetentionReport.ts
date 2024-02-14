import { Month } from "./Month";

export type Employee = {
  id: number;
  name: string;
};

export type RetentionByEmployee = {
  employee: Employee;
  nbrClients: number;
  retentionRate: number;
};

export type RetentionReportByMonth = {
  month: string;
  employees: Record<number, RetentionByEmployee>;
};

export type ReferenceMonthQueryResult = {
  month: Month;
  employee_id: number;
  employee_name: string;
  clients: string;
};

export type ReferenceMonthByEmployee = {
  employee: Employee;
  clients: number[];
};
