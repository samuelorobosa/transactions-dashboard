import type { User } from "../types/app";

/**
 * Generates initials from a user's first and last name
 * @param user - The user object with first_name and last_name
 * @returns Uppercase initials string (e.g., "OJ" for "Olivier Jones")
 */
export const getUserInitials = (user: User): string => {
  const first = user.first_name?.charAt(0) || "";
  const last = user.last_name?.charAt(0) || "";
  return (first + last).toUpperCase();
};
