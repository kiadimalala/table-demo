import {
  eq,
  ne,
  gt,
  lt,
  gte,
  lte,
  isNull,
  not,
  between,
  inArray,
  and,
  ilike,
} from "drizzle-orm";
import type { SQL } from "drizzle-orm";

export function mapFilterToExpr(
  column: SQL,
  filter: ModuleFilter
): SQL | undefined {
  const { operator, value } = filter;

  const parseValue = (val: unknown): unknown => {
    if (typeof val === "string") {
      const isoDateRegex =
        /^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}:\d{2}(?:\.\d{3})?(?:Z|[+-]\d{2}:\d{2})?)?$/;
      if (isoDateRegex.test(val)) {
        return new Date(val);
      }
    }

    return val;
  };

  if (typeof value === "string" && value.includes(",")) {
    const [startDate, endDate] = value.split(",");

    const startDateObj = parseValue(startDate);
    const endDateObj = parseValue(endDate);

    return and(gte(column, startDateObj), lte(column, endDateObj));
  }

  const parsedValue = parseValue(value);

  switch (operator) {
    case "eq":
      return eq(column, parsedValue);
    case "neq":
      return ne(column, parsedValue);
    case "gt":
      return gt(column, parsedValue);
    case "lt":
      return lt(column, parsedValue);
    case "gte":
      return gte(column, parsedValue);
    case "lte":
      return lte(column, parsedValue);
    case "between":
      if (Array.isArray(value) && value.length === 2) {
        return between(column, parseValue(value[0]), parseValue(value[1]));
      }
      break;
    case "empty":
      return isNull(column);
    case "not_empty":
      return not(isNull(column));
    case "contains":
      return ilike(column, `%${parsedValue}%`);
    case "not_contains":
      return not(ilike(column, `%${parsedValue}%`));
    case "in_array":
      if (Array.isArray(value)) {
        return inArray(column, value.map(parseValue));
      }
      break;
    default:
      return undefined;
  }
}
