export type RetentionByEmployee = {
  employeeId: number;
  employeeName: string;
  clients: number;
};

export type RetentionReportByMonth = {
  month: string;
  employees: Record<number, RetentionByEmployee>;
};
