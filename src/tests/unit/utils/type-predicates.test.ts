import { describe, it, expect } from "vitest";
import { isMonth } from "../../../utils/type-predicates";

describe("Type Predicates", () => {
  describe("isMonth", () => {
    it("should return false if random string", () => {
      expect(isMonth("test")).toBe(false);
    });

    it("should return false not a valid date", () => {
      expect(isMonth("2023-42")).toBe(false);
    });

    it("should return true for valid date", () => {
      expect(isMonth("2023-07")).toBe(true);
    });
  });
});
