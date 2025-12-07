/**
 * Formats a number as USD currency
 * @param amount - The amount to format
 * @returns Formatted currency string (e.g., "USD 1,200.00")
 */
export const formatCurrency = (amount: number): string => {
  return `USD ${amount.toLocaleString()}`;
};
