import { validMonthRegex } from "../schemas/stats";

export const isMonth = (value: string) => {
  return validMonthRegex.test(value);
};
