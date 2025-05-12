import { format, parseISO, isValid } from 'date-fns';

/**
 * Formats a date string to a readable format
 * @param {string} dateString - ISO date string
 * @param {string} formatStr - Format string for date-fns
 * @returns {string} Formatted date string
 */
export const formatDate = (dateString, formatStr = 'MM/dd/yyyy') => {
  if (!dateString) return '';
  
  try {
    const date = typeof dateString === 'string' ? parseISO(dateString) : dateString;
    if (!isValid(date)) return 'Invalid date';
    return format(date, formatStr);
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
};

/**
 * Converts a date to an ISO string date (YYYY-MM-DD)
 * @param {Date|string} date - Date to convert
 * @returns {string} ISO string date (YYYY-MM-DD)
 */
export const toISODateString = (date) => {
  if (!date) return '';
  
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    if (!isValid(dateObj)) return '';
    return format(dateObj, 'yyyy-MM-dd');
  } catch (error) {
    console.error('Error converting to ISO date string:', error);
    return '';
  }
};