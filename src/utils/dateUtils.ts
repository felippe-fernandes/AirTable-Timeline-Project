import { addDays, differenceInDays, format, parseISO } from 'date-fns';

export const getDateInString = (date?: Date): string => {
  const dateObj = date ? date : new Date();
  return format(dateObj, 'yyyy-MM-dd');
}

export const formatStringDateToDate = (dateString: string): Date => {
  return new Date(dateString);
}

export const formatDate = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, 'MM/dd/yyyy');
};

export const formatDateTime = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, 'MM/dd/yyyy HH:mm');
};

export const formatDateLong = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, 'EEEE, MMMM dd, yyyy');
};

export const getDaysBetween = (start: Date | string, end: Date | string): number => {
  const startDate = typeof start === 'string' ? formatStringDateToDate(start) : start;
  const endDate = typeof end === 'string' ? formatStringDateToDate(end) : end;
  return Math.abs(differenceInDays(endDate, startDate));
};

export const getDatePosition = (date: string, startDate: string, pixelsPerDay: number): number => {
  const days = differenceInDays(date, startDate);
  return Math.max(0, days * pixelsPerDay);
};

export const addDaysToDate = (date: Date | string, days: number): Date => {
  return addDays(date, days);
};

export const parseStringToDate = (dateString: string): Date => {
  return parseISO(dateString);
};

export const getItemWidth = (startDate: string, endDate: string, pixelsPerDay: number): number => {
  const days = getDaysBetween(formatStringDateToDate(startDate), formatStringDateToDate(endDate));
  return Math.max(days * pixelsPerDay, 20);
};
