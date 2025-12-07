import { describe, it, expect } from "vitest";
import { formatDate } from "../date.utils";

describe("formatDate", () => {
  it("should format date string correctly", () => {
    expect(formatDate("2024-01-15")).toBe("Jan 15,2024");
    expect(formatDate("2024-12-31")).toBe("Dec 31,2024");
    expect(formatDate("2024-03-03")).toBe("Mar 03,2024");
  });

  it("should pad single digit days with zero", () => {
    expect(formatDate("2024-01-01")).toBe("Jan 01,2024");
    expect(formatDate("2024-02-09")).toBe("Feb 09,2024");
  });

  it("should handle all months correctly", () => {
    expect(formatDate("2024-01-15")).toBe("Jan 15,2024");
    expect(formatDate("2024-02-15")).toBe("Feb 15,2024");
    expect(formatDate("2024-03-15")).toBe("Mar 15,2024");
    expect(formatDate("2024-04-15")).toBe("Apr 15,2024");
    expect(formatDate("2024-05-15")).toBe("May 15,2024");
    expect(formatDate("2024-06-15")).toBe("Jun 15,2024");
    expect(formatDate("2024-07-15")).toBe("Jul 15,2024");
    expect(formatDate("2024-08-15")).toBe("Aug 15,2024");
    expect(formatDate("2024-09-15")).toBe("Sep 15,2024");
    expect(formatDate("2024-10-15")).toBe("Oct 15,2024");
    expect(formatDate("2024-11-15")).toBe("Nov 15,2024");
    expect(formatDate("2024-12-15")).toBe("Dec 15,2024");
  });

  it("should handle different years correctly", () => {
    expect(formatDate("2020-01-15")).toBe("Jan 15,2020");
    expect(formatDate("2025-01-15")).toBe("Jan 15,2025");
    expect(formatDate("1999-12-31")).toBe("Dec 31,1999");
  });

  it("should handle leap year dates", () => {
    expect(formatDate("2024-02-29")).toBe("Feb 29,2024");
  });
});
