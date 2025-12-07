import { describe, it, expect } from "vitest";
import { formatCurrency } from "../currency.utils";

describe("formatCurrency", () => {
  it("should format positive numbers correctly", () => {
    expect(formatCurrency(1205600)).toBe("USD 1,205,600");
    expect(formatCurrency(1000)).toBe("USD 1,000");
    expect(formatCurrency(100)).toBe("USD 100");
  });

  it("should format zero correctly", () => {
    expect(formatCurrency(0)).toBe("USD 0");
  });

  it("should format negative numbers correctly", () => {
    expect(formatCurrency(-1000)).toBe("USD -1,000");
    expect(formatCurrency(-50000)).toBe("USD -50,000");
  });

  it("should format decimal numbers correctly", () => {
    expect(formatCurrency(1234.56)).toBe("USD 1,234.56");
    expect(formatCurrency(0.99)).toBe("USD 0.99");
  });

  it("should format large numbers with proper comma separation", () => {
    expect(formatCurrency(1000000)).toBe("USD 1,000,000");
    expect(formatCurrency(1234567890)).toBe("USD 1,234,567,890");
  });
});
