/**
 * Formats a date string to "MMM DD,YYYY" format
 * @param dateString - Date string in ISO format (e.g., "2022-03-03")
 * @returns Formatted date string (e.g., "Mar 03,2022")
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month} ${day.toString().padStart(2, "0")},${year}`;
};
