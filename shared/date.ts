import { DateTime } from "luxon";

export const fromISOtoJSDate = (date: string) => {
  return DateTime.fromISO(date).toJSDate();
};

export const fromJSDateToISO = (date: DateTime | Date) => {
  if (date instanceof DateTime) {
    return date.toISO({ includeOffset: false }) as string;
  }

  return DateTime.fromJSDate(date).toISO({ includeOffset: false }) as string;
};

export const initDateString = (toDateTime?: boolean) => {
  const now = DateTime.local();
  if (toDateTime) {
    return now as DateTime;
  }

  return fromJSDateToISO(now);
};

export const fromISOtoHTMLDate = (date: string) =>
  DateTime.fromISO(date).toISODate()!;
