import type { User } from "../types/app";

export const getUserInitials = (user: User): string => {
  const first = user.first_name?.charAt(0) || "";
  const last = user.last_name?.charAt(0) || "";
  return (first + last).toUpperCase();
};
