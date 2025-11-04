declare type module_query = "contact" | "deal" | "group" | "user" | "vehicle";
declare type module_operator = "or" | "and";
declare type module_op_compare =
  | "eq"
  | "neq"
  | "gt"
  | "lt"
  | "gte"
  | "lte"
  | "between"
  | "empty"
  | "not_empty"
  | "contains"
  | "not_contains"
  | "in_array";

declare type ModuleFilter<T extends object = unknown> = {
  operator: module_op_compare;
  value: string | number | string[] | number[];
} & {
  [key in keyof T]: string;
};

declare type FetchQuery<T extends object = unknown> = {
  token?: string;
  columns?: string[] | string;
  pageSize?: number;
  page?: number;
  token?: string;
  group?: string;
  groups?: GroupModel[];
  sort?: string;
  order?: "asc" | "desc";
  organisationId?: OrganisationModel["id"];
  filters?: {
    search?: string;
    query?: string;
    organisationId?: string;
  } & {
    [key in keyof T]?: ModuleFilter<T>[];
  };
};
