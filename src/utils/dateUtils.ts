import { addDays, differenceInDays, format, parseISO } from 'date-fns';

export const formatDate = (date: Date): string => {
  return format(date, 'MM/dd/yyyy');
};

export const formatDateTime = (date: Date): string => {
  return format(date, 'MM/dd/yyyy HH:mm');
};

export const formatDateLong = (date: Date): string => {
  return format(date, 'EEEE, MMMM dd, yyyy');
};

export const getDaysBetween = (start: Date, end: Date): number => {
  return Math.abs(differenceInDays(end, start));
};

export const getDatePosition = (date: Date, startDate: Date, pixelsPerDay: number): number => {
  const days = differenceInDays(date, startDate);
  return Math.max(0, days * pixelsPerDay);
};

export const addDaysToDate = (date: Date, days: number): Date => {
  return addDays(date, days);
};

export const parseStringToDate = (dateString: string): Date => {
  return parseISO(dateString);
};

export const getItemWidth = (startDate: Date, endDate: Date, pixelsPerDay: number): number => {
  const days = getDaysBetween(startDate, endDate);
  return Math.max(days * pixelsPerDay, 20);
};
