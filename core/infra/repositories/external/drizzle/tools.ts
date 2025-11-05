import { sql, SQL } from "drizzle-orm";

import { fromJSDateToISO } from "@/shared/date";

export function coalesce<T>(value: SQL.Aliased<T> | SQL<T>, defaultValue: SQL) {
  return sql<T>`coalesce(${value}, ${defaultValue})`;
}

export function getStartDate(
  date: Date,
  type: "day" | "month" | "week" | "year" = "day"
) {
  switch (type) {
    case "year":
      return sql<Date>`DATE_TRUNC('year', ${date}::date)`;
    case "week":
      return sql<Date>`DATE_TRUNC('week', ${date}::date)`;
    case "month":
      return sql<Date>`DATE_TRUNC('month', ${date}::date)`;
    case "day":
    default:
      return sql<Date>`DATE_TRUNC('day', ${date}::date)`;
  }
}

type EntityModel = {
  createdAt: Date | null;
  updatedAt: Date | null;
};

export const mapDateFromDB = <T extends EntityModel>(model: T) => {
  return {
    createdAt: model.createdAt ? fromJSDateToISO(model.createdAt) : undefined,
    updatedAt: model.updatedAt ? fromJSDateToISO(model.updatedAt) : undefined,
  };
};
