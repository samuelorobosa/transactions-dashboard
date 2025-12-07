import { describe, it, expect } from "vitest";
import { getUserInitials } from "../user.utils";
import type { User } from "../../types/app";

describe("getUserInitials", () => {
  it("should return uppercase initials from first and last name", () => {
    const user: User = {
      first_name: "Olivier",
      last_name: "Jones",
      email: "olivier@example.com",
    };
    expect(getUserInitials(user)).toBe("OJ");
  });

  it("should handle single character names", () => {
    const user: User = {
      first_name: "A",
      last_name: "B",
      email: "ab@example.com",
    };
    expect(getUserInitials(user)).toBe("AB");
  });

  it("should handle names with lowercase letters", () => {
    const user: User = {
      first_name: "john",
      last_name: "doe",
      email: "john@example.com",
    };
    expect(getUserInitials(user)).toBe("JD");
  });

  it("should handle empty first name", () => {
    const user: User = {
      first_name: "",
      last_name: "Smith",
      email: "smith@example.com",
    };
    expect(getUserInitials(user)).toBe("S");
  });

  it("should handle empty last name", () => {
    const user: User = {
      first_name: "John",
      last_name: "",
      email: "john@example.com",
    };
    expect(getUserInitials(user)).toBe("J");
  });

  it("should handle both names empty", () => {
    const user: User = {
      first_name: "",
      last_name: "",
      email: "test@example.com",
    };
    expect(getUserInitials(user)).toBe("");
  });

  it("should handle names with special characters", () => {
    const user: User = {
      first_name: "José",
      last_name: "García",
      email: "jose@example.com",
    };
    expect(getUserInitials(user)).toBe("JG");
  });
});
