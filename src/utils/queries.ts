/**
 * Prepares an array of values for an IN clause
 */
export const prepareIn = (arr: any[]) => arr.map(() => "?").join(",");
