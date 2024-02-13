import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Month } from "../../../types/Month";
import {
  generatePeriods,
  getThisMonth,
  isPeriodInvalid,
} from "../../../utils/dates";

describe("Dates", () => {
  beforeEach(() => {
    // tell vitest we use mocked time
    vi.useFakeTimers();
  });

  afterEach(() => {
    // restoring date after each test run
    vi.useRealTimers();
  });
  describe("getThisMonth", () => {
    it("should return this month", () => {
      const date = new Date(2024, 1, 14); // 2024-02-14
      vi.setSystemTime(date);
      expect(getThisMonth()).toBe("2024-02");
    });
  });

  describe("isPeriodInvalid", () => {
    it("should return true if period is invalid", () => {
      expect(isPeriodInvalid("2021-08" as Month, "2021-07" as Month)).toBe(
        true
      );
    });

    it("should return true if period is invalid (equality)", () => {
      expect(isPeriodInvalid("2021-08" as Month, "2021-08" as Month)).toBe(
        true
      );
    });

    it("should return false if period is valid", () => {
      expect(isPeriodInvalid("2021-08" as Month, "2021-09" as Month)).toBe(
        false
      );
    });
  });

  describe("generatePeriods", () => {
    it("should generate periods", () => {
      expect(generatePeriods("2021-08" as Month, "2021-10" as Month)).toEqual([
        { month: "2021-08", employees: {} },
        { month: "2021-09", employees: {} },
        { month: "2021-10", employees: {} },
      ]);
    });
  });
});
