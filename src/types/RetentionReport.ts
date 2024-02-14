import { Month } from "./Month";

/**
 * Shape of the query result (one row) for the first period
 */
export type ReferenceMonthQueryResult = {
  month: Month;
  employee_id: number;
  employee_name: string;
  clients: string;
};

/**
 * Shape of the report for the first period
 * Keep the list of clients for each employee for later queries
 */
export type ReferenceMonthByEmployee = {
  employeeName: string;
  clients: number[];
  clientsRetention?: number;
};

/**
 * Shape of the final report for one employee
 */
export type RetentionByEmployee = {
  employeeName: string;
  initialNumberOfClients: number;
  clientsRetention: number;
};

/**
 * Shape of the final report for one period
 
 */
export type RetentionReportByMonth = {
  month: Month;
  employees: Array<RetentionByEmployee>;
};
