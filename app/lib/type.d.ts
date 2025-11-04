declare type ActionStatus = {
  message: string;
  code?: number;
};

declare type ActionResponse<T> = [error?: ActionStatus | Error, data?: T];

declare type module_enity =
  | "contact"
  | "deal"
  | "groups"
  | "user"
  | "vehicle"
  | "leads"
  | "call";

declare type RouteQuery = {
  params: {
    [x: string]: string;
  };
  searchParams: FetchQuery & {
    [x: string]: string;
  };
};
