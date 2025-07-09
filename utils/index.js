import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Merge class names with support for conditional logic and Tailwind conflict resolution
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Format a date range into a readable string
export function getDateValues(dateRange) {
  const { start, end } = dateRange;

  if (start && end) {
    return `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`;
  } else if (start) {
    return start.toLocaleDateString();
  } else if (end) {
    return end.toLocaleDateString();
  }

  return "";
}

// Return a valid status string ('success' or 'error'), defaulting to 'success'
function getValidStatus(...statuses) {
  for (const status of statuses) {
    if (status === "success" || status === "error") {
      return status;
    }
  }
  return "success";
}

// Format number string to fixed decimal places
function formatToOneDecimal(numStr, defaultValue = 2) {
  const num = parseFloat(numStr);
  return isNaN(num) ? "0.00" : num.toFixed(defaultValue);
}

// Capitalize the first letter of a string
function captilizeFirstLetter(str = "") {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export { getValidStatus, formatToOneDecimal, captilizeFirstLetter };
