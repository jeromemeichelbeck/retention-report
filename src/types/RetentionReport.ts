import { Month } from "./Month";

export type RetentionByEmployee = {
  employeeId: number;
  employeeName: string;
  clients: number;
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

export type ReferenceReport = {
  employee: {
    id: number;
    name: string;
  };
  clients: number[];
};
