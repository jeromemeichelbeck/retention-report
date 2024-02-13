export const isMonth = (value: string) => {
  const monthRegex = new RegExp(/^\d{4}-(0[1-9]|1[0-2])$/);
  return monthRegex.test(value);
};
